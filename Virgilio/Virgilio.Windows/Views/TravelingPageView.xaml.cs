using Bing.Maps;
using Bing.Maps.Directions;
using Caliburn.Micro;
using CaronteMobile.Support;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using Windows.Devices.Geolocation;
using Windows.Foundation;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;

// The Basic Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=234237

namespace CaronteMobile.Views
{
  /// <summary>
  /// A basic page that provides characteristics common to most applications.
  /// </summary>
  public sealed partial class TravelingPageView : Page, IHandle<Geoposition>, IHandle<ObservableCollection<Spostamento>>, IHandle<Bing.Maps.Directions.WaypointCollection>
  {
    private IEventAggregator eventAggregator;
    bool IsHandlerAttached;
    Pushpin posizioneAttuale;
    Dictionary<int, Pushpin> pushpinVecchietti;

    public TravelingPageView()
    {
      this.InitializeComponent();
      pushpinVecchietti = new Dictionary<int, Pushpin>();
      IsHandlerAttached = false;
      eventAggregator = Settings.Instance.GetEventAggregator();
      if (!IsHandlerAttached)
      {
        eventAggregator.Subscribe(this);
        IsHandlerAttached = true;
      }
    }


    public void Handle(Geoposition message)
    {
      this.mappaBing.Center = new Location(message.Coordinate.Point.Position.Latitude, message.Coordinate.Point.Position.Longitude);

      MapLayer.SetPosition(posizioneAttuale, new Location(message.Coordinate.Point.Position.Latitude, message.Coordinate.Point.Position.Longitude));


    }

    private void pageRoot_Loaded(object sender, RoutedEventArgs e)
    {
      InitPosAttuale();
      if (!IsHandlerAttached)
      {
        eventAggregator.Subscribe(this);
        IsHandlerAttached = true;
      }
    }

    private void InitPosAttuale()
    {
      posizioneAttuale = new Pushpin()
      {
        Template = this.Resources["FurgoneTemplate"] as ControlTemplate
      };

      MapLayer.SetPositionAnchor(posizioneAttuale, new Point(56, 56));

      posizioneAttuale.Width = 112;
      posizioneAttuale.Height = 112;

      mappaBing.Children.Add(posizioneAttuale);
    }

    private void pageRoot_Unloaded(object sender, RoutedEventArgs e)
    {
      if (IsHandlerAttached)
        eventAggregator.Unsubscribe(this);
      IsHandlerAttached = false;
    }

    private Pushpin CaricaVecchietti(double lat, double lon, bool salita = true)
    {
      Pushpin posizione;

      posizione = new Pushpin()
      {
        Template = this.Resources[salita ? "SalitaTemplate" : "DiscesaTemplate"] as ControlTemplate
      };

      MapLayer.SetPosition(posizione, new Location(lat, lon));
      MapLayer.SetPositionAnchor(posizione, new Point(28, 28));

      posizione.Width = 56;
      posizione.Height = 56;
      mappaBing.Children.Add(posizione);

      return posizione;
    }


    public async void Handle(ObservableCollection<Spostamento> message)
    {
      WaypointCollection wayColl = new WaypointCollection();
      while (MapLayer.GetPosition(posizioneAttuale) == null)
      {
        await Task.Delay(TimeSpan.FromSeconds(1));
      }
      wayColl.Add(new Waypoint(MapLayer.GetPosition(posizioneAttuale)));
      List<int> toRemove = pushpinVecchietti.Keys.Except(message.Select(x => x.PartecipanteObj.IDSpostamento).ToList()).ToList();

      foreach (int idSpos in toRemove)
      {
        mappaBing.Children.Remove(pushpinVecchietti[idSpos]);
        pushpinVecchietti.Remove(idSpos);
      }

      foreach (Spostamento part in message)
      {
        if (pushpinVecchietti.ContainsKey(part.PartecipanteObj.IDSpostamento))
        {
          if (part.PartecipanteObj.FKIDStato == 2)
            pushpinVecchietti[part.PartecipanteObj.IDSpostamento].Template = this.Resources["DiscesaTemplate"] as ControlTemplate;
          MapLayer.SetPosition(pushpinVecchietti[part.PartecipanteObj.IDSpostamento], new Location(part.Latitudine, part.Longitudine));
        }
        else pushpinVecchietti.Add(part.PartecipanteObj.IDSpostamento, CaricaVecchietti(part.Latitudine, part.Longitudine, part.PartecipanteObj.FKIDStato == 1));
        wayColl.Add(new Waypoint(MapLayer.GetPosition(pushpinVecchietti[part.PartecipanteObj.IDSpostamento])));
      }
      mappaBing.DirectionsManager.Waypoints = wayColl;
      mappaBing.DirectionsManager.CalculateDirectionsAsync();


    }

    public void Handle(Bing.Maps.Directions.WaypointCollection message)
    {
      mappaBing.DirectionsManager.Waypoints = message;
      mappaBing.DirectionsManager.CalculateDirectionsAsync();
    }
  }
}
