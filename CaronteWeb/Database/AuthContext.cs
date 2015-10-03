using Microsoft.AspNet.Identity.EntityFramework;


namespace CaronteWeb.Database
{
	public class AuthContext: IdentityDbContext<IdentityUser>
	{
		public AuthContext()
			//: base(@"Data Source=MDTASG\SQLSERVER2014;Initial Catalog=Caronte;Persist Security Info=True;MultipleActiveResultSets=True;User ID=sa;Password=Mssqlidea2014")
      : base(@"Data Source=LORENZO-PC\SQLEXPRESS;Initial Catalog=Caronte;Persist Security Info=True;MultipleActiveResultSets=True;User ID=sa;Password=windows")
      //: base(@"Data Source=(LocalDB)\v11.0;AttachDbFilename=C:\Users\Lorenzo\Projects\caronte\CaronteWeb\App_Data\CaronteEDB.mdf;Integrated Security=True")
		{

		}
	}
}