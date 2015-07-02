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
	public class DipendenteController : ApiController
	{
		DipendenteService dipServ = new DipendenteService();

		[HttpGet]
		public IHttpActionResult GetDipendenti()
		{
			try
			{
				return Ok(dipServ.GetAll(null,null));
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpGet]
		public IHttpActionResult GetDipendenteSingolo(int id)
		{
			try
			{
				return Ok(dipServ.Get(id));
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpPost]
		public IHttpActionResult CreateDipendente([FromBody] DipendenteDTO dto)
		{
			try
			{
				return Ok(dipServ.New(dto));
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpPut]
		public IHttpActionResult EditDipendente([FromBody] DipendenteDTO dto)
		{
			try
			{
				return Ok(dipServ.Update(dto));
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpDelete]
		public IHttpActionResult DeleteDipendente(int id)
		{
			try
			{
				return Ok(dipServ.Delete(id));
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}
	}
}
