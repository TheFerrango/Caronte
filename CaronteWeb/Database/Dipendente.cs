﻿using System;
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

		[Column("Password")]
		[MaxLength(255)]
		[Required]
		public string Password { get; set; }

		[Column("DipendenteDal")]
		[Required]
		public DateTimeOffset DipendenteDal { get; set; }

		[Column("DipendenteAl")]
		[Required]
		public DateTimeOffset DipendenteAl { get; set; }

		[Column("Attivo")]
		[Required]
		public bool Attivo { get; set; }


	}
}