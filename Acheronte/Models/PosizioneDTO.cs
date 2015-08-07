using System;

namespace Acheronte.Models
{
	public class PosizioneDTO 
	{
		public int IDPosizione { set; get; }
		public int? FKIDViaggio { set; get; }
		public DateTime Data { set; get; }
		public double Latitudine { set; get; }
		public double Longitudine { set; get; }
		public double Precisione { set; get; }
	}

}