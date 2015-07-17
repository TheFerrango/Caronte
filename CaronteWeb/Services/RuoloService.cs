using CaronteWeb.Database;
using CaronteWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;

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

		public Dictionary<string, object> GetAll(int? page, int? howMany)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				Dictionary<string, object> toRet = new Dictionary<string, object>();
				IQueryable<RuoloDTO> ruoliList = GetAllIQ(caronteCtx).OrderBy(x => x.IDRuolo);
				toRet.Add("Totale", ruoliList.Count());

				if (page.HasValue && howMany.HasValue)
					ruoliList = ruoliList.Skip(page.Value * howMany.Value).Take(howMany.Value);

				toRet.Add("Dati", ruoliList.ToList());

				return toRet;
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
