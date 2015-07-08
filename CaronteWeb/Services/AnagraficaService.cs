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
			return from ana in caronteCtx.Anagrafica
				   select new AnagraficaDTO
				   {
					   IDAnagrafica = ana.IDAnagrafica,
					   CodiceFiscale = ana.CodiceFiscale,
					   Nome = ana.Nome,
					   Cognome = ana.Cognome,
					   DataNascita = ana.DataNascita,
					   Indirizzo = ana.Indirizzo,
					   Latitude = ana.Latitude,
					   Longitude = ana.Longitude,
					   Sesso = ana.Sesso,
					   Telefono = ana.Telefono,
					   Cellulare = ana.Cellulare,
					   Email = ana.Email
				   };
		}


		public Dictionary<string, object> GetAll(int? page, int? howMany)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				Dictionary<string, object> toRet = new Dictionary<string, object>();
				IQueryable<AnagraficaDTO> anaList = GetAllIQ(caronteCtx).OrderBy(x => x.Cognome);
				toRet.Add("Totale", anaList.Count());

				if (page.HasValue && howMany.HasValue)
					anaList = anaList.Skip(page.Value * howMany.Value).Take(howMany.Value);

				toRet.Add("Dati", anaList.ToList());

				return toRet;
			}
		}

		public Dictionary<string, object> GetAll(int? page, int? howMany, string filter)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				Dictionary<string, object> toRet = new Dictionary<string, object>();
				IQueryable<AnagraficaDTO> anaList = GetAllIQ(caronteCtx).OrderBy(x => x.Cognome);
				toRet.Add("Totale", anaList.Count());

				if (page.HasValue && howMany.HasValue)
					anaList = anaList.Skip(page.Value * howMany.Value).Take(howMany.Value);

				if (!String.IsNullOrWhiteSpace(filter))
				{
					filter = filter.ToUpper();
					anaList = anaList.Where(x => x.Nome.ToUpper().Contains(filter) || x.Cognome.ToUpper().Contains(filter));
				}

				toRet.Add("Dati", anaList.ToList());

				return toRet;
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