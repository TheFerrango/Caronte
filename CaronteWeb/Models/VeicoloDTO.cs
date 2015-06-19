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
		public int AnnoProduzione { set; get; }
		public DateTimeOffset DataAcquisto { set; get; }
		public DateTimeOffset? DataVendita { set; get; }


		public Veicolo ToEntity()
		{
			return new Veicolo()
		   {
			   Targa = this.Targa,
			   Modello = this.Modello,
			   AnnoProduzione = this.AnnoProduzione,
			   DataAcquisto = this.DataAcquisto,
			   DataVendita = this.DataVendita
		   };
		}

		public Veicolo ToEntity(Veicolo toEdit)
		{
			toEdit.Targa = this.Targa;
			toEdit.Modello = this.Modello;
			toEdit.AnnoProduzione = this.AnnoProduzione;
			toEdit.DataAcquisto = this.DataAcquisto;
			toEdit.DataVendita = this.DataVendita;
			return toEdit;
		}
	}

}