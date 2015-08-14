using CaronteWeb.Database;
using CaronteWeb.Models;
using System.Collections.Generic;
using System.Linq;

namespace CaronteWeb.Services
{
	public class DipendenteService : IService<DipendenteDTO>
	{		
		public IQueryable<DipendenteDTO> GetAllIQ(CaronteContext caronteCtx)
		{
			return from dip in caronteCtx.Dipendente
				   select new DipendenteDTO
				   {
					   IDDipendente = dip.IDDipendente,
					   FKIDAnagrafica = dip.FKIDAnagrafica,
					   FKIDRuolo = dip.FKIDRuolo,
					   Password = dip.Password,
					   DipendenteDal = dip.DipendenteDal,
					   DipendenteAl = dip.DipendenteAl,
					   Attivo = dip.Attivo,
					   Username = dip.Username,
					   NOMINATIVO = dip.Anagrafica.Cognome + " " + dip.Anagrafica.Nome,
					   RUOLO_DESC = dip.Ruolo.Descrizione
				   };
		}

		public Dictionary<string, object> GetAll(int? page, int? howMany)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				Dictionary<string, object> toRet = new Dictionary<string, object>();
				IQueryable<DipendenteDTO> dipeList = GetAllIQ(caronteCtx).OrderBy(x => x.DipendenteDal);
				toRet.Add("Totale", dipeList.Count());

				if (page.HasValue && howMany.HasValue)
					dipeList = dipeList.Skip(page.Value * howMany.Value).Take(howMany.Value);			

				toRet.Add("Dati", dipeList.ToList());

				return toRet;
			}
		}

		public Dictionary<string, object> GetAll(int? page, int? howMany, int? ruolo)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				Dictionary<string, object> toRet = new Dictionary<string, object>();
				IQueryable<DipendenteDTO> dipeList = GetAllIQ(caronteCtx).OrderBy(x => x.DipendenteDal);
				
				if (ruolo.HasValue)
					dipeList = dipeList.Where(x => x.FKIDRuolo == ruolo);
				
				toRet.Add("Totale", dipeList.Count());

				if (page.HasValue && howMany.HasValue)
					dipeList = dipeList.Skip(page.Value * howMany.Value).Take(howMany.Value);


				toRet.Add("Dati", dipeList.ToList());

				return toRet;
			}
		}

		public DipendenteDTO GetFoarAuth(string passWd, string userName)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				return GetAllIQ(caronteCtx).FirstOrDefault(x => x.Username == userName && x.Password == passWd);
			}
		}

		public DipendenteDTO Get(int ID)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				return GetAllIQ(caronteCtx).FirstOrDefault(x => x.IDDipendente == ID);
			}
		}

		public DipendenteDTO New(DipendenteDTO DTO)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				Dipendente tmp = DTO.ToEntity();
				caronteCtx.Dipendente.Add(tmp);
				caronteCtx.SaveChanges();

				if(tmp.IDDipendente > 0)
				{
					AuthRepository ar = new AuthRepository();
					ar.RegisterUser(tmp);
				}

				return this.Get(tmp.IDDipendente);
			}
		}

		public DipendenteDTO Update(DipendenteDTO DTO)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				Dipendente tmpAna = caronteCtx.Dipendente.Find(DTO.IDDipendente);
				DTO.ToEntity(tmpAna);	
				caronteCtx.SaveChanges();
				AuthRepository ar = new AuthRepository();
				if (ar.FindUser(DTO.Username, DTO.Password) != null)
					ar.UpdateUser(tmpAna);
				else ar.RegisterUser(tmpAna);
				return this.Get(tmpAna.IDDipendente);
			}
		}

		public bool Delete(int ID)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				caronteCtx.Dipendente.Remove(caronteCtx.Dipendente.Find(ID));
				AuthRepository ar = new AuthRepository();
				
				caronteCtx.SaveChanges();
				return true;
			}
		}

        public DipendenteDTO GetByUsername(string username)
        {
            using (CaronteContext caronteCtx = new CaronteContext())
            {
                return GetAllIQ(caronteCtx).FirstOrDefault(x => x.Username == username);
            }
        }
	}
}