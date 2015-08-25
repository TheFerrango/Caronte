using Acheronte.APIs;
using Acheronte.Models;
using Bing.Maps;
using Caliburn.Micro;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;
using Windows.Devices.Geolocation;
using Windows.UI.Popups;
using Windows.UI.Xaml;
using System.Threading.Tasks;


namespace CaronteMobile.ViewModels
{
	public class TravelingPageViewModel : Screen
	{
		#region dichiarazione e proprietà

		private readonly INavigationService navigationService;
		private readonly IEventAggregator eventAggregator;
		private Helpers.DBManager dbMan;
		private PosizioneAPI posAPI;
		private ViaggioDTO viaggioInCorso;
		private Geolocator geoLoc;
		private Location currentPosition;
		private ObservableCollection<PartecipanteDTO> listaPasseggeri;
		private List<PosizioneDTO> bufferPosizioni;
		private DispatcherTimer bufferTimer;

		public ObservableCollection<PartecipanteDTO> ListaPasseggeri
		{
			get { return listaPasseggeri; }
			set
			{
				listaPasseggeri = value;
				NotifyOfPropertyChange(() => ListaPasseggeri);
			}
		}

		public ViaggioDTO ViaggioInCorso
		{
			get { return viaggioInCorso; }
			set
			{
				viaggioInCorso = value;
				NotifyOfPropertyChange();
			}
		}

		private Location CurrentPosition
		{
			set
			{
				currentPosition = value;
			}
		}

		public double CenterLatitude
		{
			get { return currentPosition != null ? currentPosition.Latitude : 0; }
		}

		public double CenterLongitude
		{
			get { return currentPosition != null ? currentPosition.Longitude : 0; }
		}

		#endregion

		#region Inizializzazione

		public TravelingPageViewModel(INavigationService navigationService, IEventAggregator eventAggregator)
		{
			this.navigationService = navigationService;
			this.eventAggregator = eventAggregator;
			geoLoc = new Geolocator();
			bufferTimer = new DispatcherTimer();
			dbMan = new Helpers.DBManager();
			CurrentPosition = new Location(0, 0);
			ListaPasseggeri = new ObservableCollection<PartecipanteDTO>();
			bufferPosizioni = new List<PosizioneDTO>();
			posAPI = new PosizioneAPI(Settings.Instance.AccessToken);
		}

		protected override async void OnViewAttached(object view, object context)
		{
			base.OnViewAttached(view, context);
			ViaggioInCorso = Settings.Instance.SelectedViaggio;
			List<PartecipanteDTO> partTotali = await dbMan.cmDB.Table<PartecipanteDTO>().Where(part => part.FKIDViaggio == ViaggioInCorso.IDViaggio).ToListAsync();

			ListaPasseggeri = new ObservableCollection<PartecipanteDTO>(partTotali.Where(p => p.FKIDStato < 3).ToList());

			eventAggregator.PublishOnUIThread(ListaPasseggeri);

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

				List<PosizioneDTO> precedenti = await CheckPosizioniSalvate();

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

		private async Task<List<PosizioneDTO>> CheckPosizioniSalvate()
		{
			List<int> idViaggi = (await dbMan.cmDB.Table<ViaggioDTO>().Where(via => via.FKIDDipendente == Settings.Instance.DipendenteInfo.IDDipendente).ToListAsync()).Select(x => x.IDViaggio).ToList();
			return await dbMan.cmDB.Table<PosizioneDTO>().Where(pos => idViaggi.Contains(pos.FKIDViaggio.Value)).ToListAsync();
		}

		private async Task<bool> UploadPosizioni(List<PosizioneDTO> posizioni)
		{
			try
			{
				bool res = await posAPI.SendPositionData(posizioni);
				if (res)
					posizioni.Clear();
			}
			catch
			{
				return false;
			}
			return true;
		}

		private async Task<bool> SavePosizioni(List<PosizioneDTO> posizioni)
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
			bufferPosizioni.Add(new PosizioneDTO()
			{
				Data = DateTime.UtcNow,
				FKIDViaggio = Settings.Instance.SelectedViaggio.IDViaggio,
				Latitudine = args.Position.Coordinate.Point.Position.Latitude,
				Longitudine = args.Position.Coordinate.Point.Position.Longitude,
				Precisione = args.Position.Coordinate.Accuracy
			});
		}

		#endregion

		public void PasseggeroSelected(object dataSource)
		{

		}

		public void backButton()
		{
			navigationService.GoBack();
		}
	}
}
