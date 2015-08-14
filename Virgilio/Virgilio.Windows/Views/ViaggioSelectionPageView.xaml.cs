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
using Acheronte.Models;
using Caliburn.Micro;
using Bing.Maps;

// The Basic Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=234237

namespace Virgilio.Views
{
    /// <summary>
    /// A basic page that provides characteristics common to most applications.
    /// </summary>
    public sealed partial class ViaggioSelectionPageView : Page, IHandle<ViaggioDTO>
    {

      private IEventAggregator eventAggregator;
        bool IsHandlerAttached;
        Pushpin posizioneStart, posizioneEnd;


        public ViaggioSelectionPageView()
        {
            this.InitializeComponent();
            IsHandlerAttached = false;
            eventAggregator = ((Virgilio.App)App.Current).Container.GetAllInstances(typeof(IEventAggregator)).FirstOrDefault() as IEventAggregator;

        }


        private void pageRoot_Loaded(object sender, RoutedEventArgs e)
        {
            
            if (!IsHandlerAttached)
                eventAggregator.Subscribe(this);
            posizioneStart = new Pushpin();
            posizioneEnd = new Pushpin();
            mappaBing.Children.Add(posizioneStart);
            mappaBing.Children.Add(posizioneEnd);
            
        }

     

        private void pageRoot_Unloaded(object sender, RoutedEventArgs e)
        {
            if (IsHandlerAttached)
                eventAggregator.Unsubscribe(this);
        }

     

        public void Handle(ViaggioDTO message)
        {

            //this.mappaBing.Center = new Location(message.LatitudinePartenzaPrevista, message.LongitudinePartenzaPrevista);

            MapLayer.SetPosition(posizioneStart, new Location(message.LatitudinePartenzaPrevista, message.LongitudinePartenzaPrevista));
            MapLayer.SetPosition(posizioneEnd, new Location(message.LatitudineArrivoPrevista, message.LongitudineArrivoPrevista));

            

        }
    }
}
