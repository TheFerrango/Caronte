using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CaronteWeb.Models;
using CaronteWeb.Database;
namespace CaronteWeb.Services
{
	public class AnagraficaService : IService<AnagraficaDTO>
	{

		public IQueryable<AnagraficaDTO> GetAllIQ(CaronteContext caronteCtx)
		{
			
				IQueryable<AnagraficaDTO> anas = (from ana in caronteCtx.Anagrafica
											select new AnagraficaDTO
											{
												IDAnagrafica = ana.IDAnagrafica,
												CodiceFiscale = ana.CodiceFiscale,
												Nome = ana.Nome,
												Cognome = ana.Cognome,
												DataNascita = ana.DataNascita,
												Indirizzo = ana.Indirizzo,
												Latitude = ana.Latitude,
												Longitude = ana.Longitude
											});
				return anas;
			
		}

		public List<AnagraficaDTO> GetAll()
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				return GetAllIQ(caronteCtx).ToList();
			}
		}

		public AnagraficaDTO Get(int ID)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				AnagraficaDTO anas = (from ana in this.GetAllIQ(caronteCtx)
									  where ana.IDAnagrafica == ID
									  select ana).FirstOrDefault();
				return anas;
			}
		}

		public AnagraficaDTO New(AnagraficaDTO DTO)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				Anagrafica tmp = DTO.ToEntity();
				caronteCtx.Anagrafica.Add(tmp);
				caronteCtx.SaveChanges();
				return this.Get(tmp.IDAnagrafica);
			}
		}

		public AnagraficaDTO Update(AnagraficaDTO DTO)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				Anagrafica tmpAna = caronteCtx.Anagrafica.Find(DTO.IDAnagrafica);
				DTO.ToEntity(tmpAna);
				caronteCtx.SaveChanges();
				return this.Get(tmpAna.IDAnagrafica);
			}
		}

		public bool Delete(int ID)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{

				caronteCtx.Anagrafica.Remove(caronteCtx.Anagrafica.Find(ID));
				caronteCtx.SaveChanges();
				return true;
			}
		}
	}
}