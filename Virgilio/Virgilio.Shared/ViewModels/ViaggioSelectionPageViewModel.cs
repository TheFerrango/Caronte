using Acheronte.APIs;
using Acheronte.Models;
using Caliburn.Micro;
using CaronteMobile.Database;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Threading.Tasks;
using Windows.UI.Popups;
using Windows.UI.Xaml.Controls;

namespace CaronteMobile.ViewModels
{
    public class ViaggioSelectionPageViewModel : Screen
    {
        private readonly INavigationService navigationService;
        private readonly IEventAggregator eventAggregator;

        Database.DBManager dbMan;
        private ObservableCollection<Viaggio> _ViaggiDisponibili;
        private Viaggio _SelectedViaggio;
        private List<Partecipante> elencoPartecipanti;

        public bool ShowColumnMappa { get { return _SelectedViaggio != null; } }

        public string TotalePartecipanti
        {
            get { return elencoPartecipanti != null ? elencoPartecipanti.Count.ToString() : "caricamento dei partecipanti in corso"; }
        }

        public Viaggio SelectedViaggio
        {
            get { return _SelectedViaggio; }
            set
            {
                _SelectedViaggio = value;
                NotifyOfPropertyChange(() => ShowColumnMappa);
                NotifyOfPropertyChange(() => TotalePartecipanti);
                NotifyOfPropertyChange();
            }
        }

        public ObservableCollection<Viaggio> ViaggiDisponibili
        {
            get { return _ViaggiDisponibili; }
            set
            {
                _ViaggiDisponibili = value;
                NotifyOfPropertyChange(() => ViaggiDisponibili);
            }
        }

        public ViaggioSelectionPageViewModel(INavigationService navigationService, IEventAggregator eventAggregator)
        {
            this.navigationService = navigationService;
            this.eventAggregator = eventAggregator;
            ViaggiDisponibili = new ObservableCollection<Viaggio>();
            dbMan = new Database.DBManager();
        }

        protected override async void OnViewAttached(object view, object context)
        {
            base.OnViewAttached(view, context);
            ViaggiDisponibili = new ObservableCollection<Viaggio>(await dbMan.cmDB.Table<Viaggio>().Where(x => x.FKIDDipendente == Settings.Instance.DipendenteInfo.IDDipendente).ToListAsync());
        }

        public async void ViaggioSelected(object cosa, SelectionChangedEventArgs manda)
        {
            if (manda.AddedItems.Count == 1)
            {
                Viaggio selViaggio = manda.AddedItems[0] as Viaggio;
                elencoPartecipanti = await dbMan.cmDB.Table<Partecipante>().Where(p => p.FKIDViaggio == selViaggio.IDViaggio).ToListAsync();
                SelectedViaggio = selViaggio;
                eventAggregator.PublishOnUIThread(SelectedViaggio);                
            }
            else
            {
                SelectedViaggio = null;
                elencoPartecipanti = new List<Partecipante>();
            }
        }

        public void BarSetViaggio()
        {
            Settings.Instance.SelectedViaggio = SelectedViaggio;
        }

        public void backButton()
        {
            navigationService.GoBack();
        }
    }
}
