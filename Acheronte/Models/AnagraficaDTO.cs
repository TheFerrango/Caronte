using System;

namespace Acheronte.Models
{
	public class AnagraficaDTO 
	{
	
		public int IDAnagrafica { set; get; }
		public string CodiceFiscale { set; get; }
		public string Nome { set; get; }
		public string Cognome { set; get; }
		public DateTimeOffset DataNascita { set; get; }
		public string Indirizzo { set; get; }
		public double? Latitude { set; get; }
		public double? Longitude { set; get; }
        public bool Sesso { set; get; }
	
	}


}