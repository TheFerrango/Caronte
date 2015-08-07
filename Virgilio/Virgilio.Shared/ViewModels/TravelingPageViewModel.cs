using Acheronte.APIs;
using Acheronte.Models;
using Bing.Maps;
using Caliburn.Micro;
using System;
using System.Collections.Generic;
using System.Text;
using Windows.Devices.Geolocation;
using Windows.UI.Popups;

namespace Virgilio.ViewModels
{
    public class TravelingPageViewModel : Screen
    {
        private readonly INavigationService navigationService;
        private readonly IEventAggregator eventAggregator;
        private Geolocator geoLoc;
        private Location currentPosition;

        private Location CurrentPosition
        {
            set
            {
                currentPosition = value;
                //NotifyOfPropertyChange(() => CenterLatitude);
                //NotifyOfPropertyChange(() => CenterLongitude);
            }
        }

        public double CenterLatitude
        {
            get { return currentPosition != null ? currentPosition.Latitude : 0; }
        }

        public double CenterLongitude
        {
            get { return currentPosition != null ? currentPosition.Longitude : 0; }

        }

        public TravelingPageViewModel(INavigationService navigationService, IEventAggregator eventAggregator)
        {
            this.navigationService = navigationService;
            this.eventAggregator = eventAggregator;
            geoLoc = new Geolocator();
            CurrentPosition = new Location(0, 0);
        }

        protected override void OnViewAttached(object view, object context)
        {
            base.OnViewAttached(view, context);
            geoLoc.MovementThreshold = 5;
            geoLoc.PositionChanged += geoLoc_PositionChanged;
        }

        void geoLoc_PositionChanged(Geolocator sender, PositionChangedEventArgs args)
        {

            eventAggregator.PublishOnUIThread(args.Position);
        }

        public void backButton()
        {
            navigationService.GoBack();
        }
    }
}
