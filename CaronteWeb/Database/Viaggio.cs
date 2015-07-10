using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CaronteWeb.Database
{
	[Table("Viaggio", Schema = "dbo")]
	public class Viaggio
	{
		[Column("IDViaggio")]
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Required]
		public int IDViaggio { get; set; }

		[Column("FKIDDipendente")]
		public int? FKIDDipendente { get; set; }

		[Column("FKIDStato")]
		public int? FKIDStato { get; set; }

		[Column("FKIDVeicolo")]
		public int? FKIDVeicolo { get; set; }

		[Column("DescrizioneViaggio")]
		[MaxLength(255)]
		public string DescrizioneViaggio { get; set; }

		[Column("DataInizioPrevista")]
		[Required]
		public DateTimeOffset DataInizioPrevista { get; set; }

		[Column("DataFinePrevista")]
		[Required]
		public DateTimeOffset DataFinePrevista { get; set; }

		[Column("DataInizioEffettiva")]
		public DateTimeOffset? DataInizioEffettiva { get; set; }

		[Column("DataFineEffettiva")]
		public DateTimeOffset? DataFineEffettiva { get; set; }

		[Column("IndirizzoPartenza")]
		[Required]
		[MaxLength(50)]
		public string IndirizzoPartenza { get; set; }

		[Column("IndirizzoArrivo")]
		[Required]
		[MaxLength(50)]
		public string IndirizzoArrivo { get; set; }

		[Column("LatitudinePartenzaPrevista")]
		[Required]
		public double LatitudinePartenzaPrevista { get; set; }

		[Column("LongitudinePartenzaPrevista")]
		[Required]
		public double LongitudinePartenzaPrevista { get; set; }

		[Column("LatitudineArrivoPrevista")]
		[Required]
		public double LatitudineArrivoPrevista { get; set; }

		[Column("LongitudineArrivoPrevista")]
		[Required]
		public double LongitudineArrivoPrevista { get; set; }

		[Column("LatitudinePartenzaEffettiva")]
		public double? LatitudinePartenzaEffettiva { get; set; }

		[Column("LongitudinePartenzaEffettiva")]
		public double? LongitudinePartenzaEffettiva { get; set; }

		[Column("LatitudineArrivoEffettiva")]
		public double? LatitudineArrivoEffettiva { get; set; }

		[Column("LongitudineArrivoEffettiva")]
		public double? LongitudineArrivoEffettiva { get; set; }


	}
}