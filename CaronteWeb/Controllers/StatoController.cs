using CaronteWeb.Services;
using System;
using System.Web.Http;

namespace CaronteWeb.Controllers
{
	public class StatoController : ApiController
	{
		StatoService statServ = new StatoService();

		[HttpGet]
		public IHttpActionResult GetStati()
		{
			try
			{
				return Ok(statServ.GetAll(null,null));
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpGet]
		public IHttpActionResult GetStatoSingolo(int id)
		{
			try
			{
				return Ok(statServ.Get(id));
			}
			catch (Exception e)
			{

				return BadRequest(e.Message);
			}
		}
	}
}
