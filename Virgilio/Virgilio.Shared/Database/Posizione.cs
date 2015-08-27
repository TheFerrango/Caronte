using Acheronte.Models;
using SQLite;
using System;
using System.Collections.Generic;
using System.Text;

namespace CaronteMobile.Database
{
	public class Posizione
	{
		[PrimaryKey]
		public int IDPosizione { set; get; }
		public int? FKIDViaggio { set; get; }
		public DateTime Data { set; get; }
		public double Latitudine { set; get; }
		public double Longitudine { set; get; }
		public double Precisione { set; get; }

		public PosizioneDTO ToDTO()
		{
			return new PosizioneDTO()
			{
				IDPosizione = this.IDPosizione,
				FKIDViaggio = this.FKIDViaggio,
				Data = this.Data,
				Latitudine = this.Latitudine,
				Longitudine = this.Longitudine,
				Precisione = this.Precisione
			};
		}

		public static Posizione ToEntity(PosizioneDTO dto)
		{
			return new Posizione()
			{
				IDPosizione = dto.IDPosizione,
				FKIDViaggio = dto.FKIDViaggio,
				Data = dto.Data,
				Latitudine = dto.Latitudine,
				Longitudine = dto.Longitudine,
				Precisione = dto.Precisione
			};
		}
	}

}