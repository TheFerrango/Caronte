using CaronteWeb.Database;
using CaronteWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CaronteWeb.Services
{
	public class VeicoloService:IService<VeicoloDTO>
	{
		public IQueryable<VeicoloDTO> GetAllIQ(CaronteContext caronteCtx)
		{
			return from vei in caronteCtx.Veicolo
				   select new VeicoloDTO
				   {
					   IDVeicolo = vei.IDVeicolo,
					   Targa = vei.Targa,
					   Modello = vei.Modello,
					   Cilindrata = vei.Cilindrata,
					   AnnoProduzione = vei.AnnoProduzione,
					   DataAcquisto = vei.DataAcquisto,
					   DataVendita = vei.DataVendita,
				   };
		}

		public Dictionary<string, object> GetAll(int? page, int? howMany)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				Dictionary<string, object> toRet = new Dictionary<string, object>();
				IQueryable<VeicoloDTO> veicList = GetAllIQ(caronteCtx).OrderBy(x => x.Targa);
				toRet.Add("Totale", veicList.Count());

				if (page.HasValue && howMany.HasValue)
					veicList = veicList.Skip(page.Value * howMany.Value).Take(howMany.Value);

				toRet.Add("Dati", veicList.ToList());

				return toRet;
			}
		}

		public VeicoloDTO Get(int ID)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				return GetAllIQ(caronteCtx).FirstOrDefault(x => x.IDVeicolo == ID);
			}
		}

		public VeicoloDTO New(VeicoloDTO DTO)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				Veicolo tmp = DTO.ToEntity();
				caronteCtx.Veicolo.Add(tmp);
				caronteCtx.SaveChanges();
				return this.Get(tmp.IDVeicolo);
			}
		}

		public VeicoloDTO Update(VeicoloDTO DTO)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				Veicolo tmpAna = caronteCtx.Veicolo.Find(DTO.IDVeicolo);
				DTO.ToEntity(tmpAna);
				caronteCtx.SaveChanges();
				return this.Get(tmpAna.IDVeicolo);
			}
		}

		public bool Delete(int ID)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				caronteCtx.Veicolo.Remove(caronteCtx.Veicolo.Find(ID));
				caronteCtx.SaveChanges();
				return true;
			}
		}
	}
}