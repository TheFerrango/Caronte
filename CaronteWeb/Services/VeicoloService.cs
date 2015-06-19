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
					   AnnoProduzione = vei.AnnoProduzione,
					   DataAcquisto = vei.DataAcquisto,
					   DataVendita = vei.DataVendita,
				   };
		}

		public List<VeicoloDTO> GetAll()
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				return GetAllIQ(caronteCtx).ToList();
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