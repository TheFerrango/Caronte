using CaronteWeb.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CaronteWeb.Controllers
{
	public class RuoloController : ApiController
	{
		RuoloService roloServ = new RuoloService();

		[HttpGet]
		public IHttpActionResult GetRuoli()
		{
			try
			{
				return Ok(roloServ.GetAll(null,null));
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpGet]
		public IHttpActionResult GetRuoloSingolo(int id)
		{
			try
			{
				return Ok(roloServ.Get(id));
			}
			catch (Exception e)
			{

				return BadRequest(e.Message);
			}
		}
	}
}
