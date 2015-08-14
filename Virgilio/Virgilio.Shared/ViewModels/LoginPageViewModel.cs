using Acheronte.APIs;
using Acheronte.Models;
using Caliburn.Micro;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Windows.UI.Popups;

namespace Virgilio.ViewModels
{
    public class LoginPageViewModel : Screen
    {
        private readonly INavigationService navigationService;
        OAuth oApi;
        private AnagraficaAPI anAPI;
        private DipendenteAPI diAPI;
        private ViaggioAPI viAPI;
        private PartecipantiAPI paAPI;

        private string _Username;
        private string _Password;
        private string _LoadingMessage;
        private bool _ShowLoading;

        public bool ShowLoading
        {
            get { return _ShowLoading; }
            set
            {
                _ShowLoading = value;
                NotifyOfPropertyChange(() => ShowLoading);
            }
        }

        public string Username
        {
            get { return _Username; }
            set
            {
                _Username = value;
                NotifyOfPropertyChange(() => Username);
            }
        }

        public string Password
        {
            get { return _Password; }
            set
            {
                _Password = value;
                NotifyOfPropertyChange(() => Password);
            }
        }

        public string LoadingMessage
        {
            get { return _LoadingMessage; }
            set
            {
                _LoadingMessage = value;
                NotifyOfPropertyChange(() => LoadingMessage);
            }
        }

        public LoginPageViewModel(INavigationService navigationService)
        {
            this.navigationService = navigationService;
            ShowLoading = false;
            LoadingMessage = "";
            Username = "gpinelli";
            Password = "alienware";
        }


        public async void BtnLogin()
        {
            oApi = new OAuth();
            bool loginFailed = false;
            try
            {

                ShowLoading = true;

                LoadingMessage = "Accesso alla piattaforma Caronte";
                await Task.Delay(TimeSpan.FromSeconds(1));               

                AccessToken at = await oApi.GetToken(Username, Password);
                if (!String.IsNullOrWhiteSpace(at.access_token))
                {
                    Settings.Instance.AccessToken = at;
                    Settings.Instance.Username = Username;

                    await DownloadUserData();

                    navigationService.NavigateToViewModel<MenuPageViewModel>();
                }
                else await new MessageDialog("Impossibile completare il login. Controllare le credeziali di accesso e riprovare", "Errore").ShowAsync();
            }
            catch
            {
                loginFailed = true;
            }
            finally
            {
                ShowLoading = false;
            }

            if(loginFailed)
                await new MessageDialog("Impossibile completare il login. Controllare lo stato della connettività e riprovare più tardi", "Errore").ShowAsync();
        }

        public void BtnCancel()
        {
            Username = "";
            Password = "";
        }

        private async Task<bool> DownloadUserData()
        {
            bool toRet = false;
            ShowLoading = true;

            LoadingMessage = "Istanziazione delle librerie per l'accesso ad Acheronte";
            await Task.Delay(TimeSpan.FromSeconds(1));               

            anAPI = new AnagraficaAPI(Settings.Instance.AccessToken);
            diAPI = new DipendenteAPI(Settings.Instance.AccessToken);
            viAPI = new ViaggioAPI(Settings.Instance.AccessToken);
            paAPI = new PartecipantiAPI(Settings.Instance.AccessToken);

            LoadingMessage = "Caricamento dei dati relativi al dipendente";
            await Task.Delay(TimeSpan.FromSeconds(1));               
            DipendenteDTO ddto = await diAPI.GetDipendenteByUsername(Settings.Instance.Username);
            Settings.Instance.AnagraficaUtente = await anAPI.GetAnagrafica(ddto.FKIDAnagrafica.Value);

            LoadingMessage = "Caricamento dei viaggi pianificati";
            await Task.Delay(TimeSpan.FromSeconds(1));               

            var viaggi = await viAPI.GetViaggiByAutista(ddto.IDDipendente);

            List<PartecipanteDTO> totParts = new List<PartecipanteDTO>();

            foreach (ViaggioDTO viaggio  in viaggi)
            {
                LoadingMessage = String.Format("Caricamento dei dati passeggeri per il viaggio {0}", viaggio.DescrizioneViaggio);
                totParts.AddRange(await paAPI.GetPartecipantiViaggio(viaggi[0].IDViaggio));
                await Task.Delay(TimeSpan.FromSeconds(1));
            }

            LoadingMessage = "Salvataggio dei dati in corso";
            
            Helpers.DBManager dbMan = new Helpers.DBManager();
            await dbMan.cmDB.InsertAsync(ddto);
            await dbMan.cmDB.InsertAsync(Settings.Instance.AnagraficaUtente);
            await dbMan.cmDB.InsertAllAsync(viaggi);
            await dbMan.cmDB.InsertAllAsync(totParts);

            ShowLoading = false;
            return toRet;
        }

    }
}
