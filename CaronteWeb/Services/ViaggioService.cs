using CaronteWeb.Database;
using CaronteWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CaronteWeb.Services
{
	public class ViaggioService:IService<ViaggioDTO>
	{
		public IQueryable<ViaggioDTO> GetAllIQ(CaronteContext caronteCtx)
		{
			return from viag in caronteCtx.Viaggio				   
				   select new ViaggioDTO
				   {
					   IDViaggio = viag.IDViaggio,
					   FKIDDipendente = viag.FKIDDipendente,
					   FKIDStato = viag.FKIDStato,
					   FKIDVeicolo = viag.FKIDVeicolo,
					   DescrizioneViaggio = viag.DescrizioneViaggio,
					   DataInizioPrevista = viag.DataInizioPrevista,
					   DataFinePrevista = viag.DataFinePrevista,
					   DataInizioEffettea = viag.DataInizioEffettea,
					   DataFineEffettiva = viag.DataFineEffettiva,
					   LatitudinePartenzaPrevista = viag.LatitudinePartenzaPrevista,
					   LongitudinePartenzaPrevista = viag.LongitudinePartenzaPrevista,
					   LatitudineArrivoPrevista = viag.LatitudineArrivoPrevista,
					   LongitudineArrivoPrevista = viag.LongitudineArrivoPrevista,
					   LatitudinePartenzaEffettiva = viag.LatitudinePartenzaEffettiva,
					   LongitudinePartenzaEffettiva = viag.LongitudinePartenzaEffettiva,
					   LatitudineArrivoEffettiva = viag.LatitudineArrivoEffettiva,
					   LongitudineArrivoEffettiva = viag.LongitudineArrivoEffettiva,

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
	}
}