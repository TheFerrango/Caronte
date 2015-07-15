using CaronteWeb.Database;
using System;
using System.ComponentModel.DataAnnotations;

namespace CaronteWeb.Models
{
	public class VeicoloDTO: IDTO<Veicolo>
	{
		[Key]
		public int IDVeicolo { set; get; }
		public string Targa { set; get; }
		public string Modello { set; get; }
		public int Cilindrata { set; get; }
		public int AnnoProduzione { set; get; }
		public DateTimeOffset DataAcquisto { set; get; }
		public DateTimeOffset? DataVendita { set; get; }


		public Veicolo ToEntity()
		{
			return new Veicolo()
		   {
			   Targa = this.Targa,
			   Modello = this.Modello,
			   Cilindrata = this.Cilindrata,
			   AnnoProduzione = this.AnnoProduzione,
			   DataAcquisto = this.DataAcquisto,
			   DataVendita = this.DataVendita
		   };
		}

		public Veicolo ToEntity(Veicolo toEdit)
		{
			toEdit.Targa = this.Targa;
			toEdit.Modello = this.Modello;
			toEdit.Cilindrata = this.Cilindrata;
			toEdit.AnnoProduzione = this.AnnoProduzione;
			toEdit.DataAcquisto = this.DataAcquisto.ToLocalTime();
			toEdit.DataVendita = (this.DataVendita.HasValue ? (DateTimeOffset?)this.DataVendita.Value.ToLocalTime():null);
			return toEdit;
		}
	}

}