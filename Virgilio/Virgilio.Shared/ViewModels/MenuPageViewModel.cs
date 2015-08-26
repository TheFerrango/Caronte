using Acheronte.APIs;
using Acheronte.Models;
using Caliburn.Micro;
using CaronteMobile.Database;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using Windows.UI.Popups;

namespace CaronteMobile.ViewModels
{
    public class MenuPageViewModel : Screen
    {
        private readonly INavigationService navigationService;
     
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
           
            UserWelcome = "";
        }

        protected override async void OnViewAttached(object view, object context)
        {
            base.OnViewAttached(view, context);

            if (Settings.Instance.AnagraficaUtente == null)
            {
               
            }

            UserWelcome = String.Format("Benvenut{0} {1}", Settings.Instance.AnagraficaUtente.Sesso ? "o" : "a", Settings.Instance.AnagraficaUtente.Nome);
        }

        public async void StartViaggio()
        {
			if (Settings.Instance.SelectedViaggio == null)
			{
				Database.DBManager dbMan = new Database.DBManager();
				List<Viaggio> viaggiUtente = await dbMan.cmDB.Table<Viaggio>().Where(x => x.FKIDDipendente == Settings.Instance.DipendenteInfo.IDDipendente).ToListAsync();
				viaggiUtente.OrderByDescending(x => DateTime.Now - x.DataInizioPrevista);
			}
            navigationService.NavigateToViewModel<TravelingPageViewModel>();            
        }

        public void IMieiViaggi()
        {
           // new MessageDialog("Funzionalità non ancora implementata, riprovare dopo il prossimo aggiornamento", "Non è pronta").ShowAsync();
            navigationService.NavigateToViewModel<ViaggioSelectionPageViewModel>();            

        }

        public void Sincronizza()
        {
            new MessageDialog("Funzionalità non ancora implementata, riprovare dopo il prossimo aggiornamento", "Non è pronta").ShowAsync();
            //Helpers.DBManager dbMan = new Helpers.DBManager();
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
