using CaronteWeb.Database;
using System.ComponentModel.DataAnnotations;

namespace CaronteWeb.Models
{
	public class StatoDTO:IDTO<Stato>
	{
		[Key]
		public int IDStato { set; get; }
		public string Descrizione { set; get; }


		public Stato ToEntity()
		{
			return new Stato()
			{
				IDStato = this.IDStato,
				Descrizione = this.Descrizione
			};
		}

		public Stato ToEntity(Stato toEdit)
		{
			toEdit.IDStato = this.IDStato;
			toEdit.Descrizione = this.Descrizione;
			return toEdit;
		}
	}

}