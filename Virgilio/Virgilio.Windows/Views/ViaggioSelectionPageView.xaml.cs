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
using Acheronte.Models;
using Caliburn.Micro;
using Bing.Maps;
using System.Threading.Tasks;

// The Basic Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=234237

namespace CaronteMobile.Views
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
            eventAggregator = ((CaronteMobile.App)App.Current).Container.GetAllInstances(typeof(IEventAggregator)).FirstOrDefault() as IEventAggregator;
        }


        private void pageRoot_Loaded(object sender, RoutedEventArgs e)
        {

            if (!IsHandlerAttached)
                eventAggregator.Subscribe(this);

            posizioneStart = new Pushpin();
            //{
            //    Template = this.Resources["StartTemplate"] as ControlTemplate,
            //    Width = 128,
            //    Height = 128
            //};

            posizioneEnd = new Pushpin();
            //{
            //    Template = this.Resources["FinishTemplate"] as ControlTemplate,
            //    Width = 128,
            //    Height = 128
            //};

            //MapLayer.SetPositionAnchor(posizioneStart, new Point(64, 64));
            //MapLayer.SetPositionAnchor(posizioneEnd, new Point(64, 64));


            mappaBing.Children.Add(posizioneStart);
            mappaBing.Children.Add(posizioneEnd);           

        }



        private void pageRoot_Unloaded(object sender, RoutedEventArgs e)
        {
            if (IsHandlerAttached)
                eventAggregator.Unsubscribe(this);
        }



        public async void Handle(ViaggioDTO message)
        {
            Location posPartenza = new Location(message.LatitudinePartenzaPrevista, message.LongitudinePartenzaPrevista);
            Location posArrivo = new Location(message.LatitudineArrivoPrevista, message.LongitudineArrivoPrevista);

            MapLayer.SetPosition(posizioneStart, posPartenza);
            MapLayer.SetPosition(posizioneEnd, posArrivo);

            LocationCollection lc = new LocationCollection();
            lc.Add(posPartenza);
            lc.Add(posArrivo);

            while (mappaBing.ActualWidth < 1)
            {
                await Task.Delay(TimeSpan.FromMilliseconds(10));  
            }

            var bounds = new LocationRect(lc);
            mappaBing.SetView(bounds.Center, AdattaZoomMappa(lc, mappaBing.ActualWidth, mappaBing.ActualHeight, 10));
        }

        private double AdattaZoomMappa(IList<Location> locations, double mapWidth, double mapHeight, int buffer)
        {

            Location center = new Location();
            double zoomLevel = 0;

            double maxLat = -85;
            double minLat = 85;
            double maxLon = -180;
            double minLon = 180;

            //calculate bounding rectangle
            for (int i = 0; i < locations.Count; i++)
            {
                if (locations[i].Latitude > maxLat)
                {
                    maxLat = locations[i].Latitude;
                }

                if (locations[i].Latitude < minLat)
                {
                    minLat = locations[i].Latitude;
                }

                if (locations[i].Longitude > maxLon)
                {
                    maxLon = locations[i].Longitude;
                }

                if (locations[i].Longitude < minLon)
                {
                    minLon = locations[i].Longitude;
                }
            }

            center.Latitude = (maxLat + minLat) / 2;
            center.Longitude = (maxLon + minLon) / 2;

            double zoom1 = 0, zoom2 = 0;

            //Determine the best zoom level based on the map scale and bounding coordinate information
            if (maxLon != minLon && maxLat != minLat)
            {
                //best zoom level based on map width
                zoom1 = Math.Log(360.0 / 256.0 * (mapWidth - 2 * buffer) / (maxLon - minLon)) / Math.Log(2);
                //best zoom level based on map height
                zoom2 = Math.Log(180.0 / 256.0 * (mapHeight - 2 * buffer) / (maxLat - minLat)) / Math.Log(2);
            }

            //use the most zoomed out of the two zoom levels
            zoomLevel = (zoom1 < zoom2) ? zoom1 : zoom2;

            return zoomLevel;
        }
    }

}
