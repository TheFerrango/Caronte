using Acheronte.APIs;
using Caliburn.Micro;
using CaronteMobile.Database;
using CaronteMobile.Support;
using CaronteMobile.Views.UserControls;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using Windows.Devices.Geolocation;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls.Primitives;


namespace CaronteMobile.ViewModels
{
	public class TravelingPageViewModel : Screen
	{
		#region dichiarazione e proprietà

		private readonly INavigationService navigationService;
		private readonly IEventAggregator eventAggregator;
		private Database.DBManager dbMan;
		private PosizioneAPI posAPI;
		private Viaggio viaggioInCorso;
		private Geolocator geoLoc;
		private Geoposition currentPosition;
		private ObservableCollection<Spostamento> listaPasseggeri;
		private List<Posizione> bufferPosizioni;
		private DispatcherTimer bufferTimer;

		public ObservableCollection<Spostamento> ListaPasseggeri
		{
			get { return listaPasseggeri; }
			set
			{
				listaPasseggeri = value;
				NotifyOfPropertyChange(() => ListaPasseggeri);
			}
		}

		public Viaggio ViaggioInCorso
		{
			get { return viaggioInCorso; }
			set
			{
				viaggioInCorso = value;
				NotifyOfPropertyChange();
			}
		}		

		#endregion

		#region Inizializzazione

		public TravelingPageViewModel(INavigationService navigationService, IEventAggregator eventAggregator)
		{
			this.navigationService = navigationService;
			this.eventAggregator = eventAggregator;
			geoLoc = new Geolocator();
			bufferTimer = new DispatcherTimer();
			dbMan = new Database.DBManager();
			currentPosition = null;
			ListaPasseggeri = new ObservableCollection<Spostamento>();
			bufferPosizioni = new List<Posizione>();
			posAPI = new PosizioneAPI(Settings.Instance.AccessToken);
		}

		protected override async void OnViewAttached(object view, object context)
		{
			base.OnViewAttached(view, context);
			ViaggioInCorso = Settings.Instance.SelectedViaggio;

			await ReloadListaPartecipanti();

			geoLoc.MovementThreshold = 5;
			geoLoc.PositionChanged += geoLoc_PositionChanged;

			bufferTimer.Interval = TimeSpan.FromSeconds(Settings.Instance.MaxBufferSeconds);
			bufferTimer.Tick += bufferTimer_Tick;
			bufferTimer.Start();
		}

		protected override void OnDeactivate(bool close)
		{
			bufferTimer.Stop();
			base.OnDeactivate(close);
		}

		#endregion

		#region Gestione Tracking

		async void bufferTimer_Tick(object sender, object e)
		{
			try
			{
				bufferTimer.Stop();

				List<Posizione> precedenti = await CheckPosizioniSalvate();

				if (precedenti.Count > 0)
					bufferPosizioni.AddRange(precedenti);

				if (Settings.IsConnectedToInternet())
					await UploadPosizioni(bufferPosizioni);
				else await SavePosizioni(bufferPosizioni);
			}
			catch (Exception)
			{

			}
			finally
			{
				bufferTimer.Start();
			}
		}

		private async Task<List<Posizione>> CheckPosizioniSalvate()
		{
			List<int> idViaggi = (await dbMan.cmDB.Table<Viaggio>().Where(via => via.FKIDDipendente == Settings.Instance.DipendenteInfo.IDDipendente).ToListAsync()).Select(x => x.IDViaggio).ToList();
			List<Posizione> listPoss = await dbMan.cmDB.Table<Posizione>().ToListAsync();
			return listPoss.Where(pos => pos.FKIDViaggio.HasValue && idViaggi.Contains(pos.FKIDViaggio.Value)).ToList();
		}

		private async Task<bool> UploadPosizioni(List<Posizione> posizioni)
		{
			try
			{
				bool res = await posAPI.SendPositionData(posizioni.Select(p=>p.ToDTO()).ToList());
				if (res)
					posizioni.Clear();
			}
			catch
			{
				return false;
			}
			return true;
		}

		private async Task<bool> SavePosizioni(List<Posizione> posizioni)
		{
			try
			{
				await dbMan.cmDB.InsertAllAsync(posizioni);
			}
			catch
			{
				return false;
			}
			return true;
		}

		void geoLoc_PositionChanged(Geolocator sender, PositionChangedEventArgs args)
		{
			eventAggregator.PublishOnUIThread(args.Position);
			currentPosition = args.Position;
			bufferPosizioni.Add(new Posizione()
			{
				Data = DateTime.UtcNow,
				FKIDViaggio = Settings.Instance.SelectedViaggio.IDViaggio,
				Latitudine = args.Position.Coordinate.Point.Position.Latitude,
				Longitudine = args.Position.Coordinate.Point.Position.Longitude,
				Precisione = args.Position.Coordinate.Accuracy
			});
		}

		#endregion

		public void PasseggeroSelected(Spostamento dataContext)
		{
			
			Popup pop = new Popup();
			pop.Closed += pop_Closed;
			pop.Child = new PasseggeroStatusChanger(pop, dataContext, currentPosition);
			pop.HorizontalOffset = (Window.Current.Bounds.Width - 800) / 2;
			pop.VerticalOffset = (Window.Current.Bounds.Height - 500) / 2;
			pop.IsOpen = true;
		}

		async void pop_Closed(object sender, object e)
		{
			await ReloadListaPartecipanti();
		}

		private async Task ReloadListaPartecipanti()
		{
			List<Partecipante> partTotali = await dbMan.cmDB.Table<Partecipante>().Where(part => part.FKIDViaggio == ViaggioInCorso.IDViaggio).ToListAsync();

			ListaPasseggeri = new ObservableCollection<Spostamento>(partTotali.Where(p => p.FKIDStato < 3).Select(p=>Spostamento.FromPartecipante(p)).OrderByDescending(x=>(x.Orario -DateTime.Now)) .ToList());

			eventAggregator.PublishOnUIThread(ListaPasseggeri);
		}

		public void backButton()
		{
			navigationService.GoBack();
		}
	}
}
