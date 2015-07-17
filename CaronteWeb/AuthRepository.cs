using CaronteWeb.Database;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CaronteWeb
{
	public class AuthRepository : IDisposable
	{
		private AuthContext authCtx;

		private UserManager<IdentityUser> userManager;

		public AuthRepository()
		{
			authCtx = new AuthContext();
			userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(authCtx));
		}

		public IdentityUser FindUser(string userName, string password)
		{	
			IdentityUser user = userManager.Find(userName, password);
			return user;
		}

		public IdentityResult RegisterUser(Dipendente userModel)
		{
			IdentityUser user = new IdentityUser
			{
				UserName = userModel.Username,				
				Id= userModel.IDDipendente.ToString(),			
			};
						
			var result = userManager.Create(user, userModel.Password);

			return result;
		}

		public bool UpdateUser(Dipendente userModel)
		{
			IdentityUser iu =userManager.FindById(userModel.FKIDAnagrafica.ToString());
			iu.UserName = userModel.Username;
			return userManager.Update(iu).Succeeded;
		}

		public bool DeleteUser(int id)
		{
			IdentityUser iu =userManager.FindById(id.ToString());
			return userManager.Delete(iu).Succeeded;
		}

		public void Dispose()
		{
			authCtx.Dispose();
			userManager.Dispose();

		}
	}
}