using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CaronteWeb.Database
{
	[Table("Posizione", Schema = "dbo")]
	public class Posizione
	{
		[Column("IDPosizione")]
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Required]
		public int IDPosizione { get; set; }

		[Column("FKIDViaggio")]
		public int? FKIDViaggio { get; set; }

		[Column("Data")]
		[Required]
		public DateTimeOffset Data { get; set; }

		[Column("Latitudine")]
		[Required]
		public double Latitudine { get; set; }

		[Column("Longitudine")]
		[Required]
		public double Longitudine { get; set; }


	}
}