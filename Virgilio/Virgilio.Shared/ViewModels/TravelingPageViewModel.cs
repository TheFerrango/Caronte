using Acheronte.APIs;
using Acheronte.Models;
using Bing.Maps;
using Caliburn.Micro;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using Windows.Devices.Geolocation;
using Windows.UI.Popups;

namespace Virgilio.ViewModels
{
    public class TravelingPageViewModel : Screen
    {
        private readonly INavigationService navigationService;
        private readonly IEventAggregator eventAggregator;
        private Helpers.DBManager dbMan;
        private ViaggioDTO viaggioInCorso;
        private Geolocator geoLoc;
        private Location currentPosition;
        private ObservableCollection<PartecipanteDTO> listaPasseggeri;

        public ObservableCollection<PartecipanteDTO> ListaPasseggeri
        {
            get { return listaPasseggeri; }
            set
            {
                listaPasseggeri = value;
                NotifyOfPropertyChange(() => ListaPasseggeri);
            }
        }

        public ViaggioDTO ViaggioInCorso
        {
            get { return viaggioInCorso; }
            set
            {
                viaggioInCorso = value;
                NotifyOfPropertyChange();
            }
        }

        private Location CurrentPosition
        {
            set
            {
                currentPosition = value;
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
            dbMan = new Helpers.DBManager();
            CurrentPosition = new Location(0, 0);
            ListaPasseggeri = new ObservableCollection<PartecipanteDTO>();
        }

        protected override async void OnViewAttached(object view, object context)
        {
            base.OnViewAttached(view, context);
            ViaggioInCorso = Settings.Instance.SelectedViaggio;
            List<PartecipanteDTO> partTotali = await dbMan.cmDB.Table<PartecipanteDTO>().Where(part => part.FKIDViaggio == ViaggioInCorso.IDViaggio).ToListAsync();
         
            ListaPasseggeri = new ObservableCollection<PartecipanteDTO>(partTotali.Where(p => p.FKIDStato < 3).ToList());

            eventAggregator.PublishOnUIThread(ListaPasseggeri);

            geoLoc.MovementThreshold = 5;
            geoLoc.PositionChanged += geoLoc_PositionChanged;
        }



        void geoLoc_PositionChanged(Geolocator sender, PositionChangedEventArgs args)
        {
            eventAggregator.PublishOnUIThread(args.Position);
        }

        public void PasseggeroSelected(object dataSource)
        {

        }

        public void backButton()
        {
            navigationService.GoBack();
        }
    }
}
