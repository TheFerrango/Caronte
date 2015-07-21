using CaronteWeb.Models;
using CaronteWeb.Services;
using System;
using System.Web.Http;

namespace CaronteWeb.Controllers
{
	public class AnagraficaController : ApiController
	{
		AnagraficaService anaService = new AnagraficaService();

		[Authorize]
		[HttpGet]
		public IHttpActionResult GetAnagrafiche([FromUri] int? page = null, [FromUri] int? howMany = null, [FromUri] string filter = "")
		{
			try
			{
				return Ok(anaService.GetAll(page, howMany, filter));
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpGet]
		public IHttpActionResult GetAnagraficaSingola(int id)
		{
			try
			{
				return Ok(anaService.Get(id));
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpPost]
		public IHttpActionResult CreateAnagrafica([FromBody] AnagraficaDTO dto)
		{
			try
			{
				return Ok(anaService.New(dto));
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpPut]
		public IHttpActionResult EditAnagrafica([FromBody] AnagraficaDTO dto)
		{
			try
			{
				return Ok(anaService.Update(dto));
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpDelete]
		public IHttpActionResult DeleteAnagrafica(int id)
		{
			try
			{
				return Ok(anaService.Delete(id));
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

	}
}
