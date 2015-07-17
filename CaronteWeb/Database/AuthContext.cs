using System;
using Microsoft.AspNet.Identity.EntityFramework;

using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CaronteWeb.Database
{
	public class AuthContext: IdentityDbContext<IdentityUser>
	{
		public AuthContext()
			: base(@"Data Source=MDTASG\SQLSERVER2014;Initial Catalog=Caronte;Persist Security Info=True;MultipleActiveResultSets=True;User ID=sa;Password=Mssqlidea2014")
		{

		}
	}
}