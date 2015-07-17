using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CaronteWeb.Database
{
	[Table("Ruolo", Schema = "dbo")]
	public class Ruolo
	{
		[Column("IDRuolo")]
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		[Required]
		public int IDRuolo { get; set; }

		[Column("Descrizione")]
		[MaxLength(50)]
		[Required]
		public string Descrizione { get; set; }


	}
}