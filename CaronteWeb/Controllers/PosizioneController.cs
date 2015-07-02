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

	public class PosizioneController : ApiController
	{
		PosizioneService posServ = new PosizioneService();

		[HttpGet]
		public IHttpActionResult GetPosizioni()
		{
			try
			{
				return Ok(posServ.GetAll(null,null));
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpGet]
		public IHttpActionResult GetPosizioneSingolo(int id)
		{
			try
			{
				return Ok(posServ.Get(id));

			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpPost]
		public IHttpActionResult CreatePosizione([FromBody] PosizioneDTO dto)
		{
			try
			{
				return Ok(posServ.New(dto));

			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpPut]
		public IHttpActionResult EditPosizione([FromBody] PosizioneDTO dto)
		{
			try
			{
				return Ok(posServ.Update(dto));

			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpDelete]
		public IHttpActionResult DeletePosizione(int id)
		{
			try
			{
				return Ok(posServ.Delete(id));

			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}
	}
}
