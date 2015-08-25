using Acheronte.APIs;
using Acheronte.Models;
using Caliburn.Micro;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using System.Threading.Tasks;
using Windows.UI.Popups;
using Windows.UI.Xaml.Controls;

namespace Virgilio.ViewModels
{
    public class ViaggioSelectionPageViewModel : Screen
    {
        private readonly INavigationService navigationService;
        private readonly IEventAggregator eventAggregator;

        Helpers.DBManager dbMan;
        private ObservableCollection<ViaggioDTO> _ViaggiDisponibili;
        private ViaggioDTO _SelectedViaggio;
        private List<PartecipanteDTO> elencoPartecipanti;

        public bool ShowColumnMappa { get { return _SelectedViaggio != null; } }

        public string TotalePartecipanti
        {
            get { return elencoPartecipanti != null ? elencoPartecipanti.Count.ToString() : "caricamento dei partecipanti in corso"; }
        }

        public ViaggioDTO SelectedViaggio
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

        public ObservableCollection<ViaggioDTO> ViaggiDisponibili
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
            ViaggiDisponibili = new ObservableCollection<ViaggioDTO>();
            dbMan = new Helpers.DBManager();
        }

        protected override async void OnViewAttached(object view, object context)
        {
            base.OnViewAttached(view, context);
            ViaggiDisponibili = new ObservableCollection<ViaggioDTO>(await dbMan.cmDB.Table<ViaggioDTO>().Where(x => x.FKIDDipendente == Settings.Instance.DipendenteInfo.IDDipendente).ToListAsync());
        }

        public async void ViaggioSelected(object cosa, SelectionChangedEventArgs manda)
        {
            if (manda.AddedItems.Count == 1)
            {
                ViaggioDTO selViaggio = manda.AddedItems[0] as ViaggioDTO;
                elencoPartecipanti = await dbMan.cmDB.Table<PartecipanteDTO>().Where(p => p.FKIDViaggio == selViaggio.IDViaggio).ToListAsync();
                SelectedViaggio = selViaggio;
                eventAggregator.PublishOnUIThread(SelectedViaggio);                
            }
            else
            {
                SelectedViaggio = null;
                elencoPartecipanti = new List<PartecipanteDTO>();
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
