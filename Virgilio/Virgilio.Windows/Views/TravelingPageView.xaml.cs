using Virgilio.Common;
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

// The Basic Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=234237

namespace Virgilio.Views
{
    /// <summary>
    /// A basic page that provides characteristics common to most applications.
    /// </summary>
    public sealed partial class TravelingPageView : Page, IHandle<Geoposition>
    {
        private IEventAggregator eventAggregator;
        bool IsHandlerAttached;
        Pushpin posizioneAttuale;
        

        public TravelingPageView()
        {
            this.InitializeComponent();
            IsHandlerAttached = false;
            eventAggregator = ((Virgilio.App)App.Current).Container.GetAllInstances(typeof(IEventAggregator)).FirstOrDefault() as IEventAggregator;

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
                eventAggregator.Subscribe(this);

            CaricaVecchietti(46.1180784982862, 11.1018951790751);
            CaricaVecchietti(46.1166560803036, 11.1042649765213);
            
        }

        private void InitPosAttuale()
        {
            posizioneAttuale = new Pushpin()
            {
                Template = this.Resources["FurgoneTemplate"] as ControlTemplate

            };

            MapLayer.SetPositionAnchor(posizioneAttuale, new Point(56,56));

            posizioneAttuale.Width = 112;
            posizioneAttuale.Height = 112;

            mappaBing.Children.Add(posizioneAttuale);
        }

        private void pageRoot_Unloaded(object sender, RoutedEventArgs e)
        {
            if (IsHandlerAttached)
                eventAggregator.Unsubscribe(this);
        }

        private void CaricaVecchietti(double lat, double lon)
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
        }

    }
}
