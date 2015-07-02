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
	public class ViaggioController : ApiController
	{
		ViaggioService viagServ = new ViaggioService();

		[HttpGet]
		public IHttpActionResult GetViaggi()
		{
			try
			{
				return Ok(viagServ.GetAll(null,null));
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpGet]
		public IHttpActionResult GetViaggioSingolo(int id)
		{
			try
			{
				return Ok(viagServ.Get(id));

			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpPost]
		public IHttpActionResult CreateViaggio([FromBody] ViaggioDTO dto)
		{
			try
			{
				return Ok(viagServ.New(dto));

			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpPut]
		public IHttpActionResult EditViaggio([FromBody] ViaggioDTO dto)
		{
			try
			{
				return Ok(viagServ.Update(dto));

			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpDelete]
		public IHttpActionResult DeleteViaggio(int id)
		{
			try
			{
				return Ok(viagServ.Delete(id));

			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}
	}
}
