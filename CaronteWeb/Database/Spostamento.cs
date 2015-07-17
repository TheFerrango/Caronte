using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CaronteWeb.Database
{
	[Table("Spostamento", Schema = "dbo")]
	public class Spostamento
	{
		[Column("IDSpostamento")]
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Required]
		public int IDSpostamento { get; set; }

		[Column("FKIDAnagrafica")]
		public int? FKIDAnagrafica { get; set; }

		[Column("FKIDViaggio")]
		public int? FKIDViaggio { get; set; }

		[Column("FKIDStato")]
		public int? FKIDStato { get; set; }

		[Column("DescrizioneViaggio")]
		[MaxLength(255)]
		public string DescrizioneViaggio { get; set; }

		[Column("IndirizzoSalita")]
		[MaxLength(50)]
		public string IndirizzoSalita { get; set; }

		[Column("IndirizzoDiscesa")]
		[MaxLength(50)]
		public string IndirizzoDiscesa { get; set; }

		[Column("DataSalitaPrevista")]
		[Required]
		public DateTimeOffset DataSalitaPrevista { get; set; }

		[Column("DataDiscesaPrevista")]
		[Required]
		public DateTimeOffset DataDiscesaPrevista { get; set; }

		[Column("DataSalitaEffettiva")]
		public DateTimeOffset? DataSalitaEffettiva { get; set; }

		[Column("DataDiscesaEffettiva")]
		public DateTimeOffset? DataDiscesaEffettiva { get; set; }

		[Column("LatitudineSalitaPrevista")]
		[Required]
		public double LatitudineSalitaPrevista { get; set; }

		[Column("LongitudineSalitaPrevista")]
		[Required]
		public double LongitudineSalitaPrevista { get; set; }

		[Column("LatitudineDiscesaPrevista")]
		[Required]
		public double LatitudineDiscesaPrevista { get; set; }

		[Column("LongitudineDiscesaPrevista")]
		[Required]
		public double LongitudineDiscesaPrevista { get; set; }

		[Column("LatitudineSalitaEffettiva")]
		public double? LatitudineSalitaEffettiva { get; set; }

		[Column("LongitudineSalitaEffettiva")]
		public double? LongitudineSalitaEffettiva { get; set; }

		[Column("LatitudineDiscesaEffettiva")]
		public double? LatitudineDiscesaEffettiva { get; set; }

		[Column("LongitudineDiscesaEffettiva")]
		public double? LongitudineDiscesaEffettiva { get; set; }


	}
}