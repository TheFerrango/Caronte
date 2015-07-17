using CaronteWeb.Database;
using System.ComponentModel.DataAnnotations;

namespace CaronteWeb.Models
{
	public class RuoloDTO : IDTO<Ruolo>
	{
		[Key]
		public int IDRuolo { set; get; }
		public string Descrizione { set; get; }


		public Ruolo ToEntity()
		{
			return new Ruolo()
			{
				IDRuolo = this.IDRuolo,
				Descrizione = this.Descrizione
			};
		}

		public Ruolo ToEntity(Ruolo toEdit)
		{
			toEdit.IDRuolo = this.IDRuolo;
			toEdit.Descrizione = this.Descrizione;
			return toEdit;
		}
	}

}