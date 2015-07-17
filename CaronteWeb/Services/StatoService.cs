using CaronteWeb.Database;
using CaronteWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CaronteWeb.Services
{
	public class StatoService : IService<StatoDTO>
	{
		public IQueryable<StatoDTO> GetAllIQ(CaronteContext caronteCtx)
		{

			IQueryable<StatoDTO> stats = (from stat in caronteCtx.Stato
											  select new StatoDTO
											  {
												  IDStato = stat.IDStato,
												  Descrizione = stat.Descrizione
											  });
			return stats;

		}

		public Dictionary<string, object> GetAll(int? page, int? howMany)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				Dictionary<string, object> toRet = new Dictionary<string, object>();
				IQueryable<StatoDTO> statiList = GetAllIQ(caronteCtx).OrderBy(x => x.IDStato);
				toRet.Add("Totale", statiList.Count());

				if (page.HasValue && howMany.HasValue)
					statiList = statiList.Skip(page.Value * howMany.Value).Take(howMany.Value);

				toRet.Add("Dati", statiList.ToList());

				return toRet;
			}
		}

		public StatoDTO Get(int ID)
		{
			using (CaronteContext caronteCtx = new CaronteContext())
			{
				StatoDTO stats = (from stat in this.GetAllIQ(caronteCtx)
									  where stat.IDStato == ID
									  select stat).FirstOrDefault();
				return stats;
			}
		}

		public StatoDTO New(StatoDTO DTO)
		{
			throw new NotImplementedException();
		}

		public StatoDTO Update(StatoDTO DTO)
		{
			throw new NotImplementedException();
		}

		public bool Delete(int ID)
		{
			throw new NotImplementedException();
		}
	}
}