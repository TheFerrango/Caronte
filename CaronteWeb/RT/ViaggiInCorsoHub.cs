using CaronteWeb.Models;
using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CaronteWeb.RT
{
	public class ViaggiInCorsoHub : Hub
	{
		public void BroadcastPositions(PosizioneDTO dto)
		{
			Clients.All.broadcastMessage(dto);
		}

		public void Heartbeat()
		{
			Clients.All.heartbeat();
		}

		public override Task OnConnected()
		{
			return (base.OnConnected());
		}    
	}
}