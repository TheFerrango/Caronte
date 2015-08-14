using CaronteWeb.Models;
using CaronteWeb.Services;
using System;
using System.Web.Http;

namespace CaronteWeb.Controllers
{
	public class SpostamentoController : ApiController
	{
		SpostamentoService sposServ = new SpostamentoService();

		[HttpGet]
		public IHttpActionResult GetSpostamenti([FromUri] int? page = null, [FromUri] int? howMany = null, int? idViaggio = null)
		{
			try
			{
				return Ok(sposServ.GetAll(page, howMany, idViaggio));
			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

       

		[HttpGet]
		public IHttpActionResult GetSpostamentoSingolo(int id)
		{
			try
			{
				return Ok(sposServ.Get(id));

			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpPost]
		public IHttpActionResult CreateSpostamento([FromBody] SpostamentoDTO dto)
		{
			try
			{
				return Ok(sposServ.New(dto));

			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpPut]
		public IHttpActionResult EditSpostamento([FromBody] SpostamentoDTO dto)
		{
			try
			{
				return Ok(sposServ.Update(dto));

			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

		[HttpDelete]
		public IHttpActionResult DeleteSpostamento(int id)
		{
			try
			{
				return Ok(sposServ.Delete(id));

			}
			catch (Exception e)
			{
				return BadRequest(e.Message);
			}
		}

        [HttpGet] 
        [ActionName("getpartecipantiviaggio")]
        public IHttpActionResult GetPartecipantiViaggio(int id)
        {
            try
            {
                return Ok(sposServ.GetPartecipantiViaggio(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
	}
}
