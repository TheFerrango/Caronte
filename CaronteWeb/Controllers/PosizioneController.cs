﻿using CaronteWeb.Models;
using CaronteWeb.RT;
using CaronteWeb.Services;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace CaronteWeb.Controllers
{
	
	public class PosizioneController : ApiController
	{
		PosizioneService posServ = new PosizioneService();

		[HttpGet]
		
		public IHttpActionResult GetPosizioni([FromUri] int? page = null, [FromUri] int? howMany = null)
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
		[ActionName("getbyviaggio")]
		public IHttpActionResult GetByViaggio(int id)
		{
			try
			{
				return Ok(posServ.GetByViaggio(id));
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
		public IHttpActionResult CreatePosizione([FromBody] List<PosizioneDTO> dto)
		{
			try
			{
                foreach (var item in dto)
                {
                    posServ.New(item);
                }

				var posHub = GlobalHost.ConnectionManager.GetHubContext<ViaggiInCorsoHub>();

				posHub.Clients.All.BroadcastPositions(dto);

				//return Ok(posServ.New(dto));
				return Ok(true);

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
