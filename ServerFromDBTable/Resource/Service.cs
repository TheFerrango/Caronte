using Saidea.Lib.Security;
using Sistema381.DataBase;
using Sistema381.DTO;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.OData.Query;

namespace Sistema381.Application_Code.<%SCHEMA_CONV_CAPITALIZE%>
{
	public class <%TABLE_NAME_CAPITALIZE%>Service : ServiceBase<<%TABLE_NAME_CAPITALIZE%>DTO, int>
	{
		public IQueryable<<%TABLE_NAME_CAPITALIZE%>DTO> Get(Sistema381Context sistema381, int? key = null)
		{
			IQueryable<<%TABLE_NAME_CAPITALIZE%>DTO> res = from obj in sistema381.<%TABLE_NAME_CAPITALIZE%>
					  where ((key.HasValue && obj.<%TABLE_KEY%> == key) || (!key.HasValue))
					  select new <%TABLE_NAME_CAPITALIZE%>DTO
					  {
						  <%DTO%>
					  };
			return res;
		}

		#region CRUD
		public override List<<%TABLE_NAME_CAPITALIZE%>DTO> Get(ODataQueryOptions<<%TABLE_NAME_CAPITALIZE%>DTO> queryOptions = null)
		{
			using (Sistema381Context sistema381 = new Sistema381Context(SaideaUser.NameOrConnectionString))
			{
				IQueryable<<%TABLE_NAME_CAPITALIZE%>DTO> res = this.Get(sistema381);

				if (queryOptions != null)
				{
					return (queryOptions.ApplyToNOSelectAndExpand(res) as IQueryable<<%TABLE_NAME_CAPITALIZE%>DTO>).ToList();
				}
				else
					return res.ToList();
			}
		}

		public override List<<%TABLE_NAME_CAPITALIZE%>DTO> Get(int key)
		{
			using (Sistema381Context sistema381 = new Sistema381Context(SaideaUser.NameOrConnectionString))
			{
				return this.Get(sistema381, key).ToList();
			}
		}

		public override bool Delete(int key)
		{
			try
			{
				using (Sistema381Context sistema381 = new Sistema381Context(SaideaUser.NameOrConnectionString, SaideaUser.PUtente, HttpContext.Current.Request.Url.ToString()))
				{
					sistema381.<%TABLE_NAME_CAPITALIZE%>.Remove(sistema381.<%TABLE_NAME_CAPITALIZE%>.Find(key));
					sistema381.SaveChanges();
				}
				return true;
			}
			catch { return false; }
		}

		public override <%TABLE_NAME_CAPITALIZE%>DTO Add(<%TABLE_NAME_CAPITALIZE%>DTO DTO)
		{
			using (Sistema381Context sistema381 = new Sistema381Context(SaideaUser.NameOrConnectionString))
			{
				<%TABLE_NAME_CAPITALIZE%> entity = <%TABLE_NAME_CAPITALIZE%>Assembler.Instance().DtoToCreateDomainEntity(DTO);
				sistema381.<%TABLE_NAME_CAPITALIZE%>.Add(entity);
				sistema381.SaveChanges();

				return this.Get(sistema381, entity.<%TABLE_KEY%>).FirstOrDefault();
			}
		}

		public override <%TABLE_NAME_CAPITALIZE%>DTO Update(<%TABLE_NAME_CAPITALIZE%>DTO DTO)
		{
			using (Sistema381Context sistema381 = new Sistema381Context(SaideaUser.NameOrConnectionString))
			{
				<%TABLE_NAME_CAPITALIZE%> entity = sistema381.<%TABLE_NAME_CAPITALIZE%>.Find(DTO.<%TABLE_KEY%>);
				<%TABLE_NAME_CAPITALIZE%>Assembler.Instance().DtoToUpdateDomainEntity(DTO, entity);
				sistema381.SaveChanges();

				return this.Get(sistema381, entity.<%TABLE_KEY%>).FirstOrDefault();
			}
		}
		#endregion
	}
}