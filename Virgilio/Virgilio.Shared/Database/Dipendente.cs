using Acheronte.Models;
using SQLite;
using System;

namespace CaronteMobile.Database{
	
	public class Dipendente
	{
		[PrimaryKey]
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

		public static Dipendente ToEntity(DipendenteDTO dto)
		{

			return new Dipendente()
			{
				IDDipendente = dto.IDDipendente,
				FKIDAnagrafica = dto.FKIDAnagrafica,
				FKIDRuolo = dto.FKIDRuolo,
				Username = dto.Username,
				Password = dto.Password,
				DipendenteDal = dto.DipendenteDal,
				DipendenteAl = dto.DipendenteAl,
				Attivo = dto.Attivo,

				NOMINATIVO = dto.NOMINATIVO,
				RUOLO_DESC = dto.RUOLO_DESC,
			};
		}

	}

}