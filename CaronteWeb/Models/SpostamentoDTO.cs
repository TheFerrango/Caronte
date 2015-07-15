using CaronteWeb.Database;
using System;
using System.ComponentModel.DataAnnotations;

namespace CaronteWeb.Models
{
	public class SpostamentoDTO : IDTO<Spostamento>
	{
		[Key]
		public int IDSpostamento { set; get; }
		public int? FKIDAnagrafica { set; get; }
		public int? FKIDViaggio { set; get; }
		public int? FKIDStato { set; get; }
		public string DescrizioneViaggio { set; get; }
		public string IndirizzoSalita { set; get; }
		public string IndirizzoDiscesa { set; get; }
		public DateTimeOffset DataSalitaPrevista { set; get; }
		public DateTimeOffset DataDiscesaPrevista { set; get; }
		public DateTimeOffset? DataSalitaEffettiva { set; get; }
		public DateTimeOffset? DataDiscesaEffettiva { set; get; }
		public double LatitudineSalitaPrevista { set; get; }
		public double LongitudineSalitaPrevista { set; get; }
		public double LatitudineDiscesaPrevista { set; get; }
		public double LongitudineDiscesaPrevista { set; get; }
		public double? LatitudineSalitaEffettiva { set; get; }
		public double? LongitudineSalitaEffettiva { set; get; }
		public double? LatitudineDiscesaEffettiva { set; get; }
		public double? LongitudineDiscesaEffettiva { set; get; }

		public string NOMINATIVO { set; get; }


		public Spostamento ToEntity()
		{
			return new Spostamento()
		   {
			   FKIDAnagrafica = this.FKIDAnagrafica,
			   FKIDViaggio = this.FKIDViaggio,
			   FKIDStato = this.FKIDStato,
			   DescrizioneViaggio = string.IsNullOrWhiteSpace(this.DescrizioneViaggio) ? null : this.DescrizioneViaggio,
			   IndirizzoSalita = this.IndirizzoSalita,
			   IndirizzoDiscesa = this.IndirizzoDiscesa,
			   DataSalitaPrevista = this.DataSalitaPrevista.ToLocalTime(),
			   DataDiscesaPrevista = this.DataDiscesaPrevista.ToLocalTime(),
			   DataSalitaEffettiva = (this.DataSalitaEffettiva.HasValue ? (DateTimeOffset?)this.DataSalitaEffettiva.Value.ToLocalTime() : null),
			   DataDiscesaEffettiva = (this.DataDiscesaEffettiva.HasValue ? (DateTimeOffset?)this.DataDiscesaEffettiva.Value.ToLocalTime() : null),
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
			toEdit.IndirizzoSalita = this.IndirizzoSalita;
			toEdit.IndirizzoDiscesa = this.IndirizzoDiscesa;
			toEdit.DataSalitaPrevista = this.DataSalitaPrevista.ToLocalTime();
			toEdit.DataDiscesaPrevista = this.DataDiscesaPrevista.ToLocalTime();
			toEdit.DataSalitaEffettiva = (this.DataSalitaEffettiva.HasValue ? (DateTimeOffset?)this.DataSalitaEffettiva.Value.ToLocalTime() : null);
			toEdit.DataDiscesaEffettiva = (this.DataDiscesaEffettiva.HasValue ? (DateTimeOffset?)this.DataDiscesaEffettiva.Value.ToLocalTime() : null);
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