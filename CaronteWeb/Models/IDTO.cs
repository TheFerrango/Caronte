using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CaronteWeb.Models
{
	public interface IDTO<T>
	{
		T ToEntity();
		T ToEntity(T toEdit);
	}
}
