using Acheronte.APIs;
using Acheronte.Models;
using Caliburn.Micro;
using System;
using System.Collections.Generic;
using System.Text;
using Windows.UI.Popups;

namespace Virgilio.ViewModels
{
    public class MenuPageViewModel : Screen
    {
        private readonly INavigationService navigationService;
        private AnagraficaAPI anAPI;
        private DipendenteAPI diAPI;
        private ViaggioAPI viAPI;
        private PartecipantiAPI paAPI;
        private string userWelcome;

        public string UserWelcome
        {
            get { return userWelcome; }
            set
            {
                userWelcome = value;
                NotifyOfPropertyChange(() => UserWelcome);
            }
        }

        public MenuPageViewModel(INavigationService navigationService)
        {
            this.navigationService = navigationService;
            anAPI = new AnagraficaAPI(Settings.Instance.AccessToken);
            diAPI = new DipendenteAPI(Settings.Instance.AccessToken);
            viAPI = new ViaggioAPI(Settings.Instance.AccessToken);
            paAPI = new PartecipantiAPI(Settings.Instance.AccessToken);
            UserWelcome = "";
        }

        protected override async void OnViewAttached(object view, object context)
        {
            base.OnViewAttached(view, context);

            if (Settings.Instance.AnagraficaUtente == null)
            {
                DipendenteDTO ddto = await diAPI.GetDipendenteByUsername(Settings.Instance.Username);
                Settings.Instance.AnagraficaUtente = await anAPI.GetAnagrafica(ddto.FKIDAnagrafica.Value);
                var viaggi = await viAPI.GetViaggiByAutista(ddto.IDDipendente);
                if (viaggi.Count > 0)
                {
                    var ana = await paAPI.GetPartecipantiViaggio(viaggi[0].IDViaggio);
                }
            }

            UserWelcome = String.Format("Benvenut{0} {1}", Settings.Instance.AnagraficaUtente.Sesso ? "o" : "a", Settings.Instance.AnagraficaUtente.Nome);
        }

        public void StartViaggio()
        {
            navigationService.NavigateToViewModel<TravelingPageViewModel>();            
        }

        public void IMieiViaggi()
        {
            new MessageDialog("Funzionalità non ancora implementata, riprovare dopo il prossimo aggiornamento", "Non è pronta").ShowAsync();
        }

        public void Sincronizza()
        {
            new MessageDialog("Funzionalità non ancora implementata, riprovare dopo il prossimo aggiornamento", "Non è pronta").ShowAsync();
        }

        public void BarAbout()
        {
            new MessageDialog("Caronte Mobile, il client mobile per la piattaforma Caronte. \n(C) Copyright Lorenzo Lotto 2015", "Informazioni su Caronte Mobile").ShowAsync();
        }

        public void BarLogout()
        {
            Settings.Instance.AccessToken = null;
            Settings.Instance.AnagraficaUtente = null;
            Settings.Instance.Username = "";
            navigationService.GoBack();
        }
    }
}
