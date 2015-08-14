
using System;

namespace Acheronte.Models
{
	public class DipendenteDTO 
	{

		public int IDDipendente { set; get; }
		public int? FKIDAnagrafica { set; get; }
		public int? FKIDRuolo { set; get; }
		public string Username { set; get; }
		public string Password { set; get; }
		public DateTimeOffset DipendenteDal { set; get; }
		public DateTimeOffset? DipendenteAl { set; get; }
		public bool Attivo { set; get; }
		
		public string NOMINATIVO { get; set; }
		public string RUOLO_DESC { get; set; }

	}

}