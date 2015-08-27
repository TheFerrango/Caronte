using Acheronte.APIs;
using Acheronte.Models;
using Caliburn.Micro;
using CaronteMobile.Database;
using System;
using System.Collections.Generic;
using System.Linq;
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
		Database.DBManager dbMan;

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
			dbMan = new Database.DBManager();
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

					Dipendente datiDip = await dbMan.cmDB.Table<Dipendente>().Where(d => d.Password == Password && d.Username == Username).FirstOrDefaultAsync();
					if (datiDip != null)
					{
						Anagrafica datiAna = await dbMan.cmDB.Table<Anagrafica>().Where(a => a.IDAnagrafica == datiDip.FKIDAnagrafica).FirstOrDefaultAsync();
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

			Settings.Instance.DipendenteInfo = Dipendente.ToEntity(await diAPI.GetDipendenteByUsername(Settings.Instance.Username));
			Settings.Instance.AnagraficaUtente = Anagrafica.ToEntity(await anAPI.GetAnagrafica(Settings.Instance.DipendenteInfo.FKIDAnagrafica.Value));

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

			if (await dbMan.cmDB.Table<Dipendente>().Where(d => d.IDDipendente == Settings.Instance.DipendenteInfo.IDDipendente).CountAsync() > 0)
				await dbMan.cmDB.UpdateAsync(Settings.Instance.DipendenteInfo);
			else await dbMan.cmDB.InsertAsync(Settings.Instance.DipendenteInfo);


			if (await dbMan.cmDB.Table<Anagrafica>().Where(a => a.IDAnagrafica == Settings.Instance.AnagraficaUtente.IDAnagrafica).CountAsync() > 0)
				await dbMan.cmDB.UpdateAsync(Settings.Instance.AnagraficaUtente);
			else await dbMan.cmDB.InsertAsync(Settings.Instance.AnagraficaUtente);

			List<int> idNuoviViaggi = viaggi.Select(v => v.IDViaggio).ToList();

			List<Viaggio> viaggiPresenti = await dbMan.cmDB.Table<Viaggio>().Where(v => idNuoviViaggi.Contains(v.IDViaggio)).ToListAsync();
			List<int> idViaggiEditabili= viaggiPresenti.Where(x=>x.FKIDStato == 1).Select(x=>x.IDViaggio).ToList();
			List<int> idViaggiNonEdit = viaggiPresenti.Select(x=>x.IDViaggio).Except(idViaggiEditabili).ToList();

			foreach (Viaggio viag in viaggi.Select(v => Viaggio.ToEntity(v)).ToList())
			{
				if (!idViaggiNonEdit.Contains(viag.IDViaggio))
				{
					if(idViaggiEditabili.Contains(viag.IDViaggio))
						await dbMan.cmDB.UpdateAsync(viag);
					else await dbMan.cmDB.InsertAsync(viag);
				}
			}

			
			List<Partecipante> partecipantiPresenti = await dbMan.cmDB.Table<Partecipante>().ToListAsync();

			List<int> idPassEdit = partecipantiPresenti.Where(p=>idViaggiEditabili.Contains(p.FKIDViaggio.Value))
				.Select(x=>x.IDSpostamento).ToList();
			List<int> idPassNonEdit = partecipantiPresenti.Where(p => idViaggiNonEdit.Contains(p.FKIDViaggio.Value))
				.Select(x=>x.IDSpostamento).ToList();


			foreach (Partecipante part in totParts.Select(p => Partecipante.ToEntity(p)).ToList()) 
			{
				if (!idPassNonEdit.Contains(part.IDSpostamento))
				{
					if (idPassEdit.Contains(part.IDSpostamento))
						await dbMan.cmDB.UpdateAsync(part);
					else await dbMan.cmDB.InsertAsync(part);
				}
			}

			ShowLoading = false;
			return toRet;
		}

	}
}
