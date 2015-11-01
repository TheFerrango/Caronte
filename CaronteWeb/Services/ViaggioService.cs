using CaronteWeb.Database;
using CaronteWeb.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace CaronteWeb.Services
{
  public class ViaggioService : IService<ViaggioDTO>
  {
    public IQueryable<ViaggioDTO> GetAllIQ(CaronteContext caronteCtx)
    {
      return from viag in caronteCtx.Viaggio
             join stat in caronteCtx.Stato
             on viag.FKIDStato equals stat.IDStato           
             select new ViaggioDTO
             {
               IDViaggio = viag.IDViaggio,
               FKIDDipendente = viag.FKIDDipendente,
               FKIDStato = viag.FKIDStato,
               FKIDVeicolo = viag.FKIDVeicolo,
               DescrizioneViaggio = viag.DescrizioneViaggio,
               IndirizzoPartenza = viag.IndirizzoPartenza,
               IndirizzoArrivo = viag.IndirizzoArrivo,
               DataInizioPrevista = viag.DataInizioPrevista,
               DataFinePrevista = viag.DataFinePrevista,
               DataInizioEffettiva = viag.DataInizioEffettiva,
               DataFineEffettiva = viag.DataFineEffettiva,
               LatitudinePartenzaPrevista = viag.LatitudinePartenzaPrevista,
               LongitudinePartenzaPrevista = viag.LongitudinePartenzaPrevista,
               LatitudineArrivoPrevista = viag.LatitudineArrivoPrevista,
               LongitudineArrivoPrevista = viag.LongitudineArrivoPrevista,
               LatitudinePartenzaEffettiva = viag.LatitudinePartenzaEffettiva,
               LongitudinePartenzaEffettiva = viag.LongitudinePartenzaEffettiva,
               LatitudineArrivoEffettiva = viag.LatitudineArrivoEffettiva,
               LongitudineArrivoEffettiva = viag.LongitudineArrivoEffettiva,
               
               STATO_DESC = stat.Descrizione,
               NOMINATIVO_AUTISTA = viag.Dipendente.Anagrafica.Nome + " " + viag.Dipendente.Anagrafica.Cognome,
               
             };
    }

    public Dictionary<string, object> GetAll(int? page, int? howMany)
    {
      using (CaronteContext caronteCtx = new CaronteContext())
      {
        Dictionary<string, object> toRet = new Dictionary<string, object>();
        IQueryable<ViaggioDTO> viagList = GetAllIQ(caronteCtx).OrderBy(x => x.DataInizioPrevista);
        toRet.Add("Totale", viagList.Count());

        if (page.HasValue && howMany.HasValue)
          viagList = viagList.Skip(page.Value * howMany.Value).Take(howMany.Value);

        toRet.Add("Dati", viagList.ToList());

        return toRet;
      }
    }

    public Dictionary<string, object> GetAllFiltered(int? page, int? howMany, int? idStato)
    {
      using (CaronteContext caronteCtx = new CaronteContext())
      {
        Dictionary<string, object> toRet = new Dictionary<string, object>();
        IQueryable<ViaggioDTO> viagList = GetAllIQ(caronteCtx).OrderBy(x => x.DataInizioPrevista);
        if (idStato.HasValue)
          viagList = viagList.Where(x => x.FKIDStato == idStato.Value);

        toRet.Add("Totale", viagList.Count());

        if (page.HasValue && howMany.HasValue)
          viagList = viagList.Skip(page.Value * howMany.Value).Take(howMany.Value);



        toRet.Add("Dati", viagList.ToList());

        return toRet;
      }
    }

    public ViaggioDTO Get(int ID)
    {
      using (CaronteContext caronteCtx = new CaronteContext())
      {
        return GetAllIQ(caronteCtx).FirstOrDefault(x => x.IDViaggio == ID);
      }
    }

    public ViaggioDTO New(ViaggioDTO DTO)
    {
      using (CaronteContext caronteCtx = new CaronteContext())
      {
        Viaggio tmp = DTO.ToEntity();
        caronteCtx.Viaggio.Add(tmp);
        caronteCtx.SaveChanges();
        return this.Get(tmp.IDViaggio);
      }
    }

    public ViaggioDTO Update(ViaggioDTO DTO)
    {
      using (CaronteContext caronteCtx = new CaronteContext())
      {
        Viaggio tmpAna = caronteCtx.Viaggio.Find(DTO.IDViaggio);
        DTO.ToEntity(tmpAna);
        caronteCtx.SaveChanges();
        return this.Get(tmpAna.IDViaggio);
      }
    }

    public bool Delete(int ID)
    {
      using (CaronteContext caronteCtx = new CaronteContext())
      {
        caronteCtx.Viaggio.Remove(caronteCtx.Viaggio.Find(ID));
        caronteCtx.SaveChanges();
        return true;
      }
    }


    public List<ViaggioDTO> GetViaggiByAutista(int IDAutista)
    {
      using (CaronteContext caronteCtx = new CaronteContext())
      {
        return GetAllIQ(caronteCtx).Where(x => x.FKIDDipendente == IDAutista && x.FKIDStato < 3).ToList();
      }
    }
  }
}