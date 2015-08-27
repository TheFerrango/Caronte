using CaronteMobile.Common;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;
using Caliburn.Micro;
using Windows.Devices.Geolocation;
using Bing.Maps;
using Windows.UI;
using System.Collections.ObjectModel;
using Acheronte.Models;
using CaronteMobile.Database;
using CaronteMobile.Support;

// The Basic Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=234237

namespace CaronteMobile.Views
{
	/// <summary>
	/// A basic page that provides characteristics common to most applications.
	/// </summary>
	public sealed partial class TravelingPageView : Page, IHandle<Geoposition>, IHandle<ObservableCollection<Spostamento>>
	{
		private IEventAggregator eventAggregator;
		bool IsHandlerAttached;
		Pushpin posizioneAttuale;
		Dictionary<int, Pushpin> pushpinVecchietti;

		public TravelingPageView()
		{
			this.InitializeComponent();
			pushpinVecchietti = new Dictionary<int, Pushpin>();
			IsHandlerAttached = false;
			eventAggregator = ((CaronteMobile.App)App.Current).Container.GetAllInstances(typeof(IEventAggregator)).FirstOrDefault() as IEventAggregator;
			if (!IsHandlerAttached)
			{
				eventAggregator.Subscribe(this);
				IsHandlerAttached = true;
			}
		}


		public void Handle(Geoposition message)
		{
			this.mappaBing.Center = new Location(message.Coordinate.Point.Position.Latitude, message.Coordinate.Point.Position.Longitude);

			MapLayer.SetPosition(posizioneAttuale, new Location(message.Coordinate.Point.Position.Latitude, message.Coordinate.Point.Position.Longitude));


		}

		private void pageRoot_Loaded(object sender, RoutedEventArgs e)
		{
			
			InitPosAttuale();
			if (!IsHandlerAttached)
			{
				eventAggregator.Subscribe(this);
				IsHandlerAttached = true;
			}

			//CaricaVecchietti(46.1180784982862, 11.1018951790751);
			//CaricaVecchietti(46.1166560803036, 11.1042649765213);

		}

		private void InitPosAttuale()
		{
			posizioneAttuale = new Pushpin()
			{
				Template = this.Resources["FurgoneTemplate"] as ControlTemplate

			};

			MapLayer.SetPositionAnchor(posizioneAttuale, new Point(56, 56));

			posizioneAttuale.Width = 112;
			posizioneAttuale.Height = 112;

			mappaBing.Children.Add(posizioneAttuale);
		}

		private void pageRoot_Unloaded(object sender, RoutedEventArgs e)
		{
			if (IsHandlerAttached)
				eventAggregator.Unsubscribe(this);
			IsHandlerAttached = false;
		}

		private Pushpin CaricaVecchietti(double lat, double lon)
		{

			Pushpin posizione;

			posizione = new Pushpin()
			{
				Template = this.Resources["PushpinTemplate"] as ControlTemplate
			};

			MapLayer.SetPosition(posizione, new Location(lat, lon));
			MapLayer.SetPositionAnchor(posizione, new Point(28, 28));

			//posizione.Visibility = Windows.UI.Xaml.Visibility.Visible;
			//posizione.Background = new SolidColorBrush(Colors.DarkMagenta);
			posizione.Width = 56;
			posizione.Height = 56;
			mappaBing.Children.Add(posizione);
			return posizione;
		}


		public void Handle(ObservableCollection<Spostamento> message)
		{
			foreach (Spostamento part in message)
			{
				if (pushpinVecchietti.ContainsKey(part.PartecipanteObj.IDSpostamento))
					MapLayer.SetPosition(pushpinVecchietti[part.PartecipanteObj.IDSpostamento], new Location(part.Latitudine, part.Longitudine));
				else pushpinVecchietti.Add(part.PartecipanteObj.IDSpostamento, CaricaVecchietti(part.Latitudine, part.Longitudine));
			}
		}
	}
}
