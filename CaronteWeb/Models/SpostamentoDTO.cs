using CaronteWeb.Database;
using System;
using System.ComponentModel.DataAnnotations;

namespace CaronteWeb.Models
{
	public class SpostamentoDTO: IDTO<Spostamento>
	{
		[Key]
		public int IDSpostamento { set; get; }
		public int? FKIDAnagrafica { set; get; }
		public int? FKIDViaggio { set; get; }
		public int? FKIDStato { set; get; }
		public string DescrizioneViaggio { set; get; }
		public DateTimeOffset DataSalitaPrevista { set; get; }
		public DateTimeOffset DataDiscesaPrevista { set; get; }
		public DateTimeOffset? DataSalitaEffettea { set; get; }
		public DateTimeOffset? DataDiscesaEffettiva { set; get; }
		public double LatitudineSalitaPrevista { set; get; }
		public double LongitudineSalitaPrevista { set; get; }
		public double LatitudineDiscesaPrevista { set; get; }
		public double LongitudineDiscesaPrevista { set; get; }
		public double? LatitudineSalitaEffettiva { set; get; }
		public double? LongitudineSalitaEffettiva { set; get; }
		public double? LatitudineDiscesaEffettiva { set; get; }
		public double? LongitudineDiscesaEffettiva { set; get; }


		public Spostamento ToEntity()
		{
			return new Spostamento()
		   {
			   FKIDAnagrafica = this.FKIDAnagrafica,
			   FKIDViaggio = this.FKIDViaggio,
			   FKIDStato = this.FKIDStato,
			   DescrizioneViaggio = string.IsNullOrWhiteSpace(this.DescrizioneViaggio) ? null : this.DescrizioneViaggio,
			   DataSalitaPrevista = this.DataSalitaPrevista,
			   DataDiscesaPrevista = this.DataDiscesaPrevista,
			   DataSalitaEffettea = this.DataSalitaEffettea,
			   DataDiscesaEffettiva = this.DataDiscesaEffettiva,
			   LatitudineSalitaPrevista = this.LatitudineSalitaPrevista,
			   LongitudineSalitaPrevista = this.LongitudineSalitaPrevista,
			   LatitudineDiscesaPrevista = this.LatitudineDiscesaPrevista,
			   LongitudineDiscesaPrevista = this.LongitudineDiscesaPrevista,
			   LatitudineSalitaEffettiva = this.LatitudineSalitaEffettiva,
			   LongitudineSalitaEffettiva = this.LongitudineSalitaEffettiva,
			   LatitudineDiscesaEffettiva = this.LatitudineDiscesaEffettiva,
			   LongitudineDiscesaEffettiva = this.LongitudineDiscesaEffettiva,
		   };
		}

		public Spostamento ToEntity(Spostamento toEdit)
		{
			toEdit.FKIDAnagrafica = this.FKIDAnagrafica;
			toEdit.FKIDViaggio = this.FKIDViaggio;
			toEdit.FKIDStato = this.FKIDStato;
			toEdit.DescrizioneViaggio = string.IsNullOrWhiteSpace(this.DescrizioneViaggio) ? null : this.DescrizioneViaggio;
			toEdit.DataSalitaPrevista = this.DataSalitaPrevista;
			toEdit.DataDiscesaPrevista = this.DataDiscesaPrevista;
			toEdit.DataSalitaEffettea = this.DataSalitaEffettea;
			toEdit.DataDiscesaEffettiva = this.DataDiscesaEffettiva;
			toEdit.LatitudineSalitaPrevista = this.LatitudineSalitaPrevista;
			toEdit.LongitudineSalitaPrevista = this.LongitudineSalitaPrevista;
			toEdit.LatitudineDiscesaPrevista = this.LatitudineDiscesaPrevista;
			toEdit.LongitudineDiscesaPrevista = this.LongitudineDiscesaPrevista;
			toEdit.LatitudineSalitaEffettiva = this.LatitudineSalitaEffettiva;
			toEdit.LongitudineSalitaEffettiva = this.LongitudineSalitaEffettiva;
			toEdit.LatitudineDiscesaEffettiva = this.LatitudineDiscesaEffettiva;
			toEdit.LongitudineDiscesaEffettiva = this.LongitudineDiscesaEffettiva;
			return toEdit;
		}
	}

}