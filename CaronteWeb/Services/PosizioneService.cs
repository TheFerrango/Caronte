﻿using CaronteWeb.Database;
using CaronteWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CaronteWeb.Services
{
  public class PosizioneService : IService<PosizioneDTO>
  {
    public IQueryable<PosizioneDTO> GetAllIQ(CaronteContext caronteCtx)
    {
      return from pos in caronteCtx.Posizione
             select new PosizioneDTO
             {
               IDPosizione = pos.IDPosizione,
               FKIDViaggio = pos.FKIDViaggio,
               Data = pos.Data,
               Latitudine = pos.Latitudine,
               Longitudine = pos.Longitudine,
               Precisione = pos.Precisione,
             };
    }


    public Dictionary<string, object> GetAll(int? page, int? howMany)
    {
      using (CaronteContext caronteCtx = new CaronteContext())
      {
        Dictionary<string, object> toRet = new Dictionary<string, object>();
        IQueryable<PosizioneDTO> posList = GetAllIQ(caronteCtx).OrderBy(x => x.Data);
        toRet.Add("Totale", posList.Count());

        if (page.HasValue && howMany.HasValue)
          posList = posList.Skip(page.Value * howMany.Value).Take(howMany.Value);



        toRet.Add("Dati", posList.ToList());

        return toRet;
      }
    }

    public List<PosizioneDTO> GetByViaggio(int IDViaggio)
    {
      using (CaronteContext caronteCtx = new CaronteContext())
      {
        Dictionary<string, object> toRet = new Dictionary<string, object>();
        IQueryable<PosizioneDTO> posList = GetAllIQ(caronteCtx).OrderBy(x => x.Data);
        posList = posList.Where(x => x.FKIDViaggio == IDViaggio);


        if (posList.Count() == 0)
        {
          Viaggio vg = caronteCtx.Viaggio.FirstOrDefault(x => x.IDViaggio == IDViaggio);
          if (vg != null)
            return new List<PosizioneDTO>() { 
            new PosizioneDTO() { 
              Data = DateTime.Now,
              FKIDViaggio = IDViaggio,
              IDPosizione = 0,
              Latitudine = vg.LatitudinePartenzaPrevista,
              Longitudine = vg.LongitudinePartenzaPrevista,
              Precisione = 1
            } 
          };
          else return new List<PosizioneDTO>();
        }
        return posList.ToList();
      }
    }

    public PosizioneDTO Get(int ID)
    {
      using (CaronteContext caronteCtx = new CaronteContext())
      {
        return GetAllIQ(caronteCtx).FirstOrDefault(x => x.IDPosizione == ID);
      }
    }

    public PosizioneDTO New(PosizioneDTO DTO)
    {
      using (CaronteContext caronteCtx = new CaronteContext())
      {
        Posizione tmp = DTO.ToEntity();
        caronteCtx.Posizione.Add(tmp);
        caronteCtx.SaveChanges();
        return this.Get(tmp.IDPosizione);
      }
    }

    public PosizioneDTO Update(PosizioneDTO DTO)
    {
      using (CaronteContext caronteCtx = new CaronteContext())
      {
        Posizione tmpAna = caronteCtx.Posizione.Find(DTO.IDPosizione);
        DTO.ToEntity(tmpAna);
        caronteCtx.SaveChanges();
        return this.Get(tmpAna.IDPosizione);
      }
    }

    public bool Delete(int ID)
    {
      using (CaronteContext caronteCtx = new CaronteContext())
      {
        caronteCtx.Posizione.Remove(caronteCtx.Posizione.Find(ID));
        caronteCtx.SaveChanges();
        return true;
      }
    }
  }
}