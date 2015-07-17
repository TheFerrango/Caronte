using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

		[Column("Sesso")]
		[Required]
		public bool Sesso { set; get; }

		[Column("Telefono")]
		[MaxLength(50)]
		public string Telefono { set; get; }
	
		[Column("Cellulare")]
		[MaxLength(20)]
		public string Cellulare { set; get; }

		[Column("Email")]
		[MaxLength(20)]
		public string Email { set; get; }

	}
}