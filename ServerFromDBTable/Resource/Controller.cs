using Sistema381.Application_Code.<%SCHEMA_CONV_CAPITALIZE%>;
using Sistema381.DTO;

namespace Sistema381.Application_Code.Controllers
{
	public class <%TABLE_NAME_CAPITALIZE%>Controller : ODataControllerBase<<%TABLE_NAME_CAPITALIZE%>DTO, <%TABLE_NAME_CAPITALIZE%>Service, int>
	{
		public override bool IsValidKey(int key, <%TABLE_NAME_CAPITALIZE%>DTO dto)
		{
			return key == dto.<%TABLE_KEY%>;
		}


		//[HttpPost]
		//public IHttpActionResult GetFilter(ODataActionParameters parameters, ODataQueryOptions<CompetenzaDTO> options)
		//{
		//	try
		//	{
		//		List<int> parametro1 = (parameters["excludeIDs"] as IEnumerable<int>).ToList();
		//		DateTime parametro2 = parameters["dal"] as DateTime;
		//		return Ok(this.service.MetodoAction(parametro1, parametro2, options));
		//	}
		//	catch (Exception e)
		//	{
		//		return BadRequest(e.Message);
		//	}
		//} 
	}
}