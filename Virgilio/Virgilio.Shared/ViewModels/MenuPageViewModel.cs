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
            UserWelcome = "";
        }

        protected override async void OnViewAttached(object view, object context)
        {
            base.OnViewAttached(view, context);

            if (Settings.Instance.AnagraficaUtente == null)
            {
                Settings.Instance.AnagraficaUtente = await anAPI.GetAnagraficaUser(Settings.Instance.Username);
            }

            UserWelcome = String.Format("Benvenut{0} {1}", Settings.Instance.AnagraficaUtente.Sesso ? "o" : "a", Settings.Instance.AnagraficaUtente.Nome);
        }

        public void StartViaggio()
        {
            navigationService.NavigateToViewModel<TravelingPageViewModel>();
            
        }
    }
}
