using CaronteWeb.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaronteWeb.Services
{
	internal interface IService<ServType>
	{
		IQueryable<ServType> GetAllIQ(CaronteContext caronteCtx);
		Dictionary<string, object> GetAll(int? page, int? howMany);
		ServType Get(int ID);
		ServType New(ServType DTO);
		ServType Update(ServType DTO);
		bool Delete(int ID);
	}
}
