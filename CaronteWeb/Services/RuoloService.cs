using CaronteWeb.Database;
using CaronteWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CaronteWeb.Services
{
	public class RuoloService : IService<RuoloDTO>
	{
		public IQueryable<RuoloDTO> GetAllIQ(CaronteContext caronteCtx)
		{

			IQueryable<RuoloDTO> roles = (from role in caronteCtx.Ruolo
										  select new RuoloDTO
										  {
											  IDRuolo = role.IDRuolo,
											  Descrizione = role.Descrizione
										  });
			return roles;

		}

		public List<RuoloDTO> GetAll()
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				return GetAllIQ(caronteCtx).ToList();
			}
		}

		public RuoloDTO Get(int ID)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				RuoloDTO roles = (from stat in this.GetAllIQ(caronteCtx)
								  where stat.IDRuolo == ID
								  select stat).FirstOrDefault();
				return roles;
			}
		}

		public RuoloDTO New(RuoloDTO DTO)
		{
			throw new NotImplementedException();
		}

		public RuoloDTO Update(RuoloDTO DTO)
		{
			throw new NotImplementedException();
		}

		public bool Delete(int ID)
		{
			throw new NotImplementedException();
		}
	}
}
