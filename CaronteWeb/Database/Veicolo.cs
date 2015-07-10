using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CaronteWeb.Database
{
	[Table("Veicolo", Schema = "dbo")]
	public class Veicolo
	{
		[Column("IDVeicolo")]
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Required]
		public int IDVeicolo { get; set; }

		[Column("Targa")]
		[MaxLength(10)]
		[Required]
		public string Targa { get; set; }

		[Column("Modello")]
		[MaxLength(50)]
		[Required]
		public string Modello { get; set; }

		[Column("Cilindrata")]
		[Required]
		public int Cilindrata { get; set; }

		[Column("AnnoProduzione")]
		[Required]
		public int AnnoProduzione { get; set; }

		[Column("DataAcquisto")]
		[Required]
		public DateTimeOffset DataAcquisto { get; set; }

		[Column("DataVendita")]
		public DateTimeOffset? DataVendita { get; set; }


	}
}