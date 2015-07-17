using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CaronteWeb.Database
{
	[Table("Dipendente", Schema = "dbo")]
	public class Dipendente
	{
		[Column("IDDipendente")]
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Required]
		public int IDDipendente { get; set; }

		[Column("FKIDAnagrafica")]
		public int? FKIDAnagrafica { get; set; }

		[Column("FKIDRuolo")]
		public int? FKIDRuolo { get; set; }

		[Column("Username")]
		[MaxLength(50)]
		[Required]
		public string Username { get; set; }

		[Column("Password")]
		[MaxLength(50)]
		[Required]
		public string Password { get; set; }

		[Column("DipendenteDal")]
		[Required]
		public DateTimeOffset DipendenteDal { get; set; }

		[Column("DipendenteAl")]
		public DateTimeOffset? DipendenteAl { get; set; }

		[Column("Attivo")]
		[Required]
		public bool Attivo { get; set; }


		[ForeignKey("FKIDAnagrafica")]
		public virtual Anagrafica Anagrafica { get; set; }

		[ForeignKey("FKIDRuolo")]
		public virtual Ruolo Ruolo { get; set; }
	}
}