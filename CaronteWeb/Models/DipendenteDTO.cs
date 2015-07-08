using CaronteWeb.Database;
using System;
using System.ComponentModel.DataAnnotations;

namespace CaronteWeb.Models
{
	public class DipendenteDTO : IDTO<Dipendente>
	{
		[Key]
		public int IDDipendente { set; get; }
		public int? FKIDAnagrafica { set; get; }
		public int? FKIDRuolo { set; get; }
		public string Password { set; get; }
		public DateTimeOffset DipendenteDal { set; get; }
		public DateTimeOffset? DipendenteAl { set; get; }
		public bool Attivo { set; get; }

		public string NOMINATIVO { get; set; }
		public string RUOLO_DESC { get; set; }

		public Dipendente ToEntity()
		{
			return new Dipendente()
			{			
				IDDipendente = this.IDDipendente,
				FKIDAnagrafica = this.FKIDAnagrafica,
				FKIDRuolo = this.FKIDRuolo,
				Password = this.Password,
				DipendenteDal = this.DipendenteDal,
				DipendenteAl = this.DipendenteAl,
				Attivo = this.Attivo
			};
		}

		public Dipendente ToEntity(Dipendente toEdit)
		{
			toEdit.FKIDAnagrafica = this.FKIDAnagrafica;
			toEdit.FKIDRuolo = this.FKIDRuolo;
			toEdit.Password = this.Password;
			toEdit.DipendenteDal = this.DipendenteDal;
			toEdit.DipendenteAl = this.DipendenteAl;
			toEdit.Attivo = this.Attivo;
			return toEdit;
		}

	}

}