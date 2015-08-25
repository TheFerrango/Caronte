using Acheronte.APIs;
using Acheronte.Models;
using Caliburn.Micro;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Windows.UI.Popups;

namespace CaronteMobile.ViewModels
{
    public class LoginPageViewModel : Screen
    {
        private readonly INavigationService navigationService;
        OAuth oApi;
        private AnagraficaAPI anAPI;
        private DipendenteAPI diAPI;
        private ViaggioAPI viAPI;
        private PartecipantiAPI paAPI;
        Helpers.DBManager dbMan;

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
            dbMan = new Helpers.DBManager();
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
                LoadingMessage = "Verifica della connettività ad Internet";
                await Task.Delay(TimeSpan.FromSeconds(1));

                if (Settings.IsConnectedToInternet())
                {
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
                else
                {
                    bool logged = false;

                    LoadingMessage = "Caricamento dei dati relativi al dipendente da database\n(i dati potrebbero non essere aggiornati)";
                    await Task.Delay(TimeSpan.FromSeconds(1));

                    DipendenteDTO datiDip = await dbMan.cmDB.Table<DipendenteDTO>().Where(d => d.Password == Password && d.Username == Username).FirstOrDefaultAsync();
                    if (datiDip != null)
                    {
                        AnagraficaDTO datiAna = await dbMan.cmDB.Table<AnagraficaDTO>().Where(a => a.IDAnagrafica == datiDip.FKIDAnagrafica).FirstOrDefaultAsync();
                        if (datiAna != null)
                        {
                            Settings.Instance.DipendenteInfo = datiDip;
                            Settings.Instance.AnagraficaUtente = datiAna;
                            logged = true;
                        }
                    }

                    if (logged)
                        navigationService.NavigateToViewModel<MenuPageViewModel>();
                    else loginFailed = true;

                }
            }
            catch
            {
                loginFailed = true;
            }
            finally
            {
                ShowLoading = false;
            }

            if (loginFailed)
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

            Settings.Instance.DipendenteInfo = await diAPI.GetDipendenteByUsername(Settings.Instance.Username);
            Settings.Instance.AnagraficaUtente = await anAPI.GetAnagrafica(Settings.Instance.DipendenteInfo.FKIDAnagrafica.Value);

            LoadingMessage = "Caricamento dei viaggi pianificati";
            await Task.Delay(TimeSpan.FromSeconds(1));

            var viaggi = await viAPI.GetViaggiByAutista(Settings.Instance.DipendenteInfo.IDDipendente);

            List<PartecipanteDTO> totParts = new List<PartecipanteDTO>();

            foreach (ViaggioDTO viaggio in viaggi)
            {
                LoadingMessage = String.Format("Caricamento dei dati passeggeri per il viaggio:\n{0}", viaggio.DescrizioneViaggio);
                totParts.AddRange(await paAPI.GetPartecipantiViaggio(viaggio.IDViaggio));
                await Task.Delay(TimeSpan.FromSeconds(1));
            }

            LoadingMessage = "Salvataggio dei dati in corso";

            await dbMan.cmDB.InsertAsync(Settings.Instance.DipendenteInfo);
            await dbMan.cmDB.InsertAsync(Settings.Instance.AnagraficaUtente);
            await dbMan.cmDB.InsertAllAsync(viaggi);
            await dbMan.cmDB.InsertAllAsync(totParts);

            ShowLoading = false;
            return toRet;
        }

    }
}
