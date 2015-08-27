using Caliburn.Micro;
using CaronteMobile.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Windows.UI.Popups;
using Windows.UI.Xaml.Controls;

namespace CaronteMobile.ViewModels
{
	public class MenuPageViewModel : Screen
	{
		private readonly INavigationService navigationService;
		DBManager dbMan;
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
				await new MessageDialog("Anagrafica non trovata per l'utente corrente. Contattare l'assistenza.", "Errore").ShowAsync();
				BarLogout();
			}

			UserWelcome = String.Format("Benvenut{0} {1}", Settings.Instance.AnagraficaUtente.Sesso ? "o" : "a", Settings.Instance.AnagraficaUtente.Nome);

			dbMan = new DBManager();
		}

		public async void StartViaggio()
		{
			await CheckForInProgressViaggi();

			if (Settings.Instance.SelectedViaggio == null)
			{
				List<Viaggio> viaggiUtente = await dbMan.cmDB.Table<Viaggio>().Where(x => x.FKIDDipendente == Settings.Instance.DipendenteInfo.IDDipendente && x.FKIDStato == 1).ToListAsync();
				Viaggio primo = viaggiUtente.OrderByDescending(x => DateTime.Now - x.DataInizioPrevista).FirstOrDefault();
				
				if (primo != null)
					Settings.Instance.SelectedViaggio = primo;
			}
			if (Settings.Instance.SelectedViaggio != null)
				navigationService.NavigateToViewModel<TravelingPageViewModel>();
			else
				await new MessageDialog(String.Format("Nessun viaggio presente per l'utente corrente ({0}).", Settings.Instance.DipendenteInfo.NOMINATIVO), "Nessun viaggio trovato").ShowAsync();
		}

		private async Task CheckForInProgressViaggi()
		{
			Viaggio viOld = await dbMan.cmDB.Table<Viaggio>().Where(x => x.FKIDDipendente == Settings.Instance.DipendenteInfo.IDDipendente && x.FKIDStato == 2).FirstOrDefaultAsync();

			if (viOld != null)
			{
				MessageDialog md = new MessageDialog(String.Format("Il viaggio '{0}' risulta essere ancora 'in corso'. Riprenderne l'esecuzione o segnarlo come terminato ed iniziare il successivo?", viOld.DescrizioneViaggio), "Attenzione");
				md.Commands.Add(new UICommand()
				{
					Id = "RIP",
					Label = "Riprendi",
				});
				md.Commands.Add(new UICommand()
				{
					Id = "END",
					Label = "Termina",
				});
				if ((await md.ShowAsync()).Id.ToString() == "RIP")
					Settings.Instance.SelectedViaggio = viOld;
				else
				{
					viOld.FKIDStato = 4;
					await dbMan.cmDB.UpdateAsync(viOld);
				}
			}
		}

		public void IMieiViaggi()
		{			
			navigationService.NavigateToViewModel<ViaggioSelectionPageViewModel>();
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
