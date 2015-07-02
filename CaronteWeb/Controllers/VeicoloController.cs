using CaronteWeb.Models;
using CaronteWeb.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CaronteWeb.Controllers
{
	public class VeicoloController : ApiController
	{
		VeicoloService veiServ = new VeicoloService();

		[HttpGet]
		public IHttpActionResult GetVeicoli()
		{
			try
			{
				return Ok(veiServ.GetAll(null,null));
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpGet]
		public IHttpActionResult GetVeicoloSingolo(int id)
		{
			try
			{
				return Ok(veiServ.Get(id));

			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpPost]
		public IHttpActionResult CreateVeicolo([FromBody] VeicoloDTO dto)
		{
			try
			{
				return Ok(veiServ.New(dto));

			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpPut]
		public IHttpActionResult EditVeicolo([FromBody] VeicoloDTO dto)
		{
			try
			{
				return Ok(veiServ.Update(dto));

			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpDelete]
		public IHttpActionResult DeleteVeicolo(int id)
		{
			try
			{
				return Ok(veiServ.Delete(id));

			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}
	}
}
