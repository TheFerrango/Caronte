using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CaronteWeb.Database
{
	[Table("Stato", Schema = "dbo")]
	public class Stato
	{
		[Column("IDStato")]
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Required]
		public int IDStato { get; set; }

		[Column("Descrizione")]
		[MaxLength(50)]
		[Required]
		public string Descrizione { get; set; }


	}
}