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
    private PartecipantiAPI parAPI;
    private Viaggio viaggioInCorso;
    private Geolocator geoLoc;
    private Geoposition currentPosition;
    private ObservableCollection<Spostamento> listaPasseggeri;
    private List<Posizione> bufferPosizioni;
    List<Partecipante> bufferPartecipanti;
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
      bufferPartecipanti = new List<Partecipante>();
      posAPI = new PosizioneAPI(Settings.Instance.AccessToken);
      parAPI = new PartecipantiAPI(Settings.Instance.AccessToken);
    }

    protected override async void OnViewAttached(object view, object context)
    {
      base.OnViewAttached(view, context);
      ViaggioInCorso = Settings.Instance.SelectedViaggio;
      if (viaggioInCorso.FKIDStato != 2)
        viaggioInCorso.NeedsSending = true;
      viaggioInCorso.FKIDStato = 2;

      await dbMan.cmDB.UpdateAsync(viaggioInCorso);

      await ReloadListaPartecipanti();

      geoLoc.MovementThreshold = 5;
      geoLoc.PositionChanged += geoLoc_PositionChanged;

      bufferTimer.Interval = TimeSpan.FromSeconds(Settings.Instance.MaxBufferSeconds);
      bufferTimer.Tick += bufferTimer_Tick;
      bufferTimer.Start();
    }

    protected override async void OnDeactivate(bool close)
    {
      bufferTimer.Stop();
      if (ListaPasseggeri.Count == 0)
      {
        viaggioInCorso.FKIDStato = 3;
      }
      Settings.Instance.SelectedViaggio = null;
      await dbMan.cmDB.UpdateAsync(viaggioInCorso);

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
        {
          if (await UploadPosizioni(bufferPosizioni))
            foreach (var item in bufferPosizioni)
              await dbMan.cmDB.DeleteAsync(item);
        }
        else await SavePosizioni(bufferPosizioni);



        List<Partecipante> parPrec = await GetSendingPartecipanti();

        if (parPrec.Count > 0)
          bufferPartecipanti.AddRange(parPrec);
        if (Settings.IsConnectedToInternet())
        {
          foreach (Partecipante partec in parPrec)
          {
            await parAPI.UpdatePartecipanteViaggio(partec.ToDTO());
            partec.NeedsSending = false;
            await dbMan.cmDB.UpdateAsync(partec);
          }
        }

        await ReloadListaPartecipanti();
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
      List<Posizione> listPoss = await dbMan.cmDB.Table<Posizione>().Where(pos => pos.FKIDViaggio.HasValue && idViaggi.Contains(pos.FKIDViaggio.Value)).ToListAsync();
      return listPoss.ToList();
    }

    private async Task<bool> UploadPosizioni(List<Posizione> posizioni)
    {
      try
      {
        bool res = await posAPI.SendPositionData(posizioni.Select(p => p.ToDTO()).ToList());
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
        await dbMan.cmDB.InsertAllAsync(posizioni.Where(p => p.IDPosizione == 0).ToList());
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

    void pop_Closed(object sender, object e)
    {
      if ((sender as Popup).Tag != null)
      {
        Partecipante part = (sender as Popup).Tag as Partecipante;
        bufferPartecipanti.Add(part);
      }
    }

    private async Task<List<Partecipante>> GetSendingPartecipanti()
    {
      List<int> idViaggi = (await dbMan.cmDB.Table<Viaggio>().Where(via => via.FKIDDipendente == Settings.Instance.DipendenteInfo.IDDipendente).ToListAsync()).Select(x => x.IDViaggio).ToList();
      List<Partecipante> toSend = await dbMan.cmDB.Table<Partecipante>().Where(x => x.NeedsSending && idViaggi.Contains(x.FKIDViaggio.Value)).ToListAsync();
      return toSend;
    }


    private async Task ReloadListaPartecipanti()
    {
      List<Partecipante> partTotali = await dbMan.cmDB.Table<Partecipante>().Where(part => part.FKIDViaggio == ViaggioInCorso.IDViaggio).ToListAsync();
      ListaPasseggeri = new ObservableCollection<Spostamento>(partTotali.Where(p => p.FKIDStato < 3).Select(p => Spostamento.FromPartecipante(p)).OrderByDescending(x => (x.Orario - DateTime.Now)).ToList());
      
      
      
      eventAggregator.PublishOnUIThread(ListaPasseggeri);

    }

    public void backButton()
    {
      navigationService.GoBack();
    }
  }
}
