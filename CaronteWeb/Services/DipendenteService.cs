using CaronteWeb.Database;
using CaronteWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

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
					   Attivo = dip.Attivo
				   };
		}

		public List<DipendenteDTO> GetAll()
		{
			using(CaronteContext caronteCtx = new CaronteContext())
			{
				return GetAllIQ(caronteCtx).ToList();
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
				return this.Get(tmpAna.IDDipendente);
			}
		}

		public bool Delete(int ID)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				caronteCtx.Dipendente.Remove(caronteCtx.Dipendente.Find(ID));
				caronteCtx.SaveChanges();
				return true;
			}
		}
	}
}