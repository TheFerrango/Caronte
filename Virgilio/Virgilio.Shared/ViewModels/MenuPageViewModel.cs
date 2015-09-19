using Acheronte.APIs;
using Acheronte.Models;
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
    private PosizioneAPI posAPI;
    private PartecipantiAPI parAPI;
    private AnagraficaAPI anaAPI;
    private DipendenteAPI dipAPI;
    private ViaggioAPI viaAPI;
    private bool showLoading;
    DBManager dbMan;
    private string userWelcome;
    private string loadingMessage;

    public string LoadingMessage
    {
      get { return loadingMessage; }
      set { loadingMessage = value; }
    }

    public bool ShowLoading
    {
      get { return showLoading; }
      set
      {
        showLoading = value;
        NotifyOfPropertyChange(() => ShowLoading);
      }
    }


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
      ShowLoading = false;
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
      posAPI = new PosizioneAPI(Settings.Instance.AccessToken);
      parAPI = new PartecipantiAPI(Settings.Instance.AccessToken);
      anaAPI = new AnagraficaAPI(Settings.Instance.AccessToken);
      dipAPI = new DipendenteAPI(Settings.Instance.AccessToken);
      viaAPI = new ViaggioAPI(Settings.Instance.AccessToken);

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

    public async void Sincronizza()
    {
      if (Settings.IsConnectedToInternet())
      {
        LoadingMessage = "Caricamento dei dati locali";
        ShowLoading = true;
        List<int> idViaggi = (await dbMan.cmDB.Table<Viaggio>().Where(via => via.FKIDDipendente == Settings.Instance.DipendenteInfo.IDDipendente).ToListAsync()).Select(x => x.IDViaggio).ToList();
        List<Posizione> listPoss = await dbMan.cmDB.Table<Posizione>().Where(pos => pos.FKIDViaggio.HasValue && idViaggi.Contains(pos.FKIDViaggio.Value)).ToListAsync();
        List<Partecipante> toSend = await dbMan.cmDB.Table<Partecipante>().Where(x => x.NeedsSending && idViaggi.Contains(x.FKIDViaggio.Value)).ToListAsync();
        try
        {
          LoadingMessage = "Invio dei dati di posizionamento locali";
          if (await posAPI.SendPositionData(listPoss.Select(x => x.ToDTO()).ToList()))
            foreach (var item in listPoss)
              await dbMan.cmDB.DeleteAsync(item);

          LoadingMessage = "Invio dei dati sui partecipanti";
          foreach (Partecipante partec in toSend)
          {
            await parAPI.UpdatePartecipanteViaggio(partec.ToDTO());
            partec.NeedsSending = false;
            await dbMan.cmDB.UpdateAsync(partec);
          }

          await DownloadUserData();
        }
        catch
        {
          new MessageDialog("Si è verificato un errore durante la sincronizzazione dei dati.", "Errore di sincronizzazione").ShowAsync();
        }
        finally
        {
          ShowLoading = false;
        }
      }
      else await new MessageDialog("Connessione ad Internet non presente. Collegarsi ad una rete dati e riprovare", "Rete non presente").ShowAsync();

    }


    private async Task<bool> DownloadUserData()
    {
      bool toRet = false;
     

      LoadingMessage = "Caricamento dei dati relativi al dipendente";
      await Task.Delay(TimeSpan.FromSeconds(1));

      Settings.Instance.DipendenteInfo = Dipendente.ToEntity(await dipAPI.GetDipendenteByUsername(Settings.Instance.Username));
      Settings.Instance.AnagraficaUtente = Anagrafica.ToEntity(await anaAPI.GetAnagrafica(Settings.Instance.DipendenteInfo.FKIDAnagrafica.Value));

      LoadingMessage = "Caricamento dei viaggi pianificati";
      await Task.Delay(TimeSpan.FromSeconds(1));

      var viaggi = await viaAPI.GetViaggiByAutista(Settings.Instance.DipendenteInfo.IDDipendente);

      List<PartecipanteDTO> totParts = new List<PartecipanteDTO>();

      foreach (ViaggioDTO viaggio in viaggi)
      {
        LoadingMessage = String.Format("Caricamento dei dati passeggeri per il viaggio:\n{0}", viaggio.DescrizioneViaggio);
        totParts.AddRange(await parAPI.GetPartecipantiViaggio(viaggio.IDViaggio));
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
      List<int> idViaggiEditabili = viaggiPresenti.Where(x => x.FKIDStato == 1).Select(x => x.IDViaggio).ToList();
      List<int> idViaggiNonEdit = viaggiPresenti.Select(x => x.IDViaggio).Except(idViaggiEditabili).ToList();

      foreach (Viaggio viag in viaggi.Select(v => Viaggio.ToEntity(v)).ToList())
      {
        if (!idViaggiNonEdit.Contains(viag.IDViaggio))
        {
          if (idViaggiEditabili.Contains(viag.IDViaggio))
            await dbMan.cmDB.UpdateAsync(viag);
          else await dbMan.cmDB.InsertAsync(viag);
        }
      }


      List<Partecipante> partecipantiPresenti = await dbMan.cmDB.Table<Partecipante>().ToListAsync();

      List<int> idPassEdit = partecipantiPresenti.Where(p => idViaggiEditabili.Contains(p.FKIDViaggio.Value))
        .Select(x => x.IDSpostamento).ToList();
      List<int> idPassNonEdit = partecipantiPresenti.Where(p => idViaggiNonEdit.Contains(p.FKIDViaggio.Value))
        .Select(x => x.IDSpostamento).ToList();


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
    public async void BarAbout()
    {
      await new MessageDialog("Caronte Mobile, il client mobile per la piattaforma Caronte. \n(C) Copyright Lorenzo Lotto 2015", "Informazioni su Caronte Mobile").ShowAsync();
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
