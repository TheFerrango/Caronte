using CaronteWeb.Models;
using CaronteWeb.Services;
using System;
using System.Web.Http;

namespace CaronteWeb.Controllers
{
	public class DipendenteController : ApiController
	{
		DipendenteService dipServ = new DipendenteService();

		[HttpGet]
		public IHttpActionResult GetDipendenti([FromUri] int? page = null, [FromUri] int? howMany = null, [FromUri] int? ruolo = null)
		{
			try
			{
				return Ok(dipServ.GetAll(page, howMany, ruolo));
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpGet]        
        [ActionName("getdipendentesingolo")]
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

        [HttpGet]
        [ActionName("getbyusername")]
        public IHttpActionResult getbyusername(string id)
        {
            try
            {
                return Ok(dipServ.GetByUsername(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
	}
}
