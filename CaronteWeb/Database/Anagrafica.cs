using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CaronteWeb.Database
{
	[Table("Anagrafica", Schema = "dbo")]
	public class Anagrafica
	{
		[Column("IDAnagrafica")]
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Required]
		public int IDAnagrafica { get; set; }

		[Column("CodiceFiscale")]
		[MaxLength(16)]
		[Required]
		public string CodiceFiscale { get; set; }

		[Column("Nome")]
		[MaxLength(50)]
		[Required]
		public string Nome { get; set; }

		[Column("Cognome")]
		[MaxLength(50)]
		[Required]
		public string Cognome { get; set; }

		[Column("DataNascita")]
		[Required]
		public DateTimeOffset DataNascita { get; set; }

		[Column("Indirizzo")]
		[MaxLength(255)]
		public string Indirizzo { get; set; }

		[Column("Latitude")]
		public double? Latitude { get; set; }

		[Column("Longitude")]
		public double? Longitude { get; set; }


	}
}