using CaronteWeb.Database;
using System;
using System.ComponentModel.DataAnnotations;

namespace CaronteWeb.Models
{
	public class ViaggioDTO : IDTO<Viaggio>
	{
		[Key]
		public int IDViaggio { set; get; }
		public int? FKIDDipendente { set; get; }
		public int? FKIDStato { set; get; }
		public int? FKIDVeicolo { set; get; }
		public string DescrizioneViaggio { set; get; }
		public DateTimeOffset DataInizioPrevista { set; get; }
		public DateTimeOffset DataFinePrevista { set; get; }
		public DateTimeOffset? DataInizioEffettea { set; get; }
		public DateTimeOffset? DataFineEffettiva { set; get; }
		public double LatitudinePartenzaPrevista { set; get; }
		public double LongitudinePartenzaPrevista { set; get; }
		public double LatitudineArrivoPrevista { set; get; }
		public double LongitudineArrivoPrevista { set; get; }
		public double? LatitudinePartenzaEffettiva { set; get; }
		public double? LongitudinePartenzaEffettiva { set; get; }
		public double? LatitudineArrivoEffettiva { set; get; }
		public double? LongitudineArrivoEffettiva { set; get; }


		public Viaggio ToEntity()
		{
			return new Viaggio()
			{
				FKIDDipendente = this.FKIDDipendente,
				FKIDStato = this.FKIDStato,
				FKIDVeicolo = this.FKIDVeicolo,
				DescrizioneViaggio = string.IsNullOrWhiteSpace(this.DescrizioneViaggio) ? null : this.DescrizioneViaggio,
				DataInizioPrevista = this.DataInizioPrevista,
				DataFinePrevista = this.DataFinePrevista,
				DataInizioEffettea = this.DataInizioEffettea,
				DataFineEffettiva = this.DataFineEffettiva,
				LatitudinePartenzaPrevista = this.LatitudinePartenzaPrevista,
				LongitudinePartenzaPrevista = this.LongitudinePartenzaPrevista,
				LatitudineArrivoPrevista = this.LatitudineArrivoPrevista,
				LongitudineArrivoPrevista = this.LongitudineArrivoPrevista,
				LatitudinePartenzaEffettiva = this.LatitudinePartenzaEffettiva,
				LongitudinePartenzaEffettiva = this.LongitudinePartenzaEffettiva,
				LatitudineArrivoEffettiva = this.LatitudineArrivoEffettiva,
				LongitudineArrivoEffettiva = this.LongitudineArrivoEffettiva,
			};
		}
		public Viaggio ToEntity(Viaggio toEdit)
		{
			toEdit.FKIDDipendente = this.FKIDDipendente;
			toEdit.FKIDStato = this.FKIDStato;
			toEdit.FKIDVeicolo = this.FKIDVeicolo;
			toEdit.DescrizioneViaggio = string.IsNullOrWhiteSpace(this.DescrizioneViaggio) ? null : this.DescrizioneViaggio;
			toEdit.DataInizioPrevista = this.DataInizioPrevista;
			toEdit.DataFinePrevista = this.DataFinePrevista;
			toEdit.DataInizioEffettea = this.DataInizioEffettea;
			toEdit.DataFineEffettiva = this.DataFineEffettiva;
			toEdit.LatitudinePartenzaPrevista = this.LatitudinePartenzaPrevista;
			toEdit.LongitudinePartenzaPrevista = this.LongitudinePartenzaPrevista;
			toEdit.LatitudineArrivoPrevista = this.LatitudineArrivoPrevista;
			toEdit.LongitudineArrivoPrevista = this.LongitudineArrivoPrevista;
			toEdit.LatitudinePartenzaEffettiva = this.LatitudinePartenzaEffettiva;
			toEdit.LongitudinePartenzaEffettiva = this.LongitudinePartenzaEffettiva;
			toEdit.LatitudineArrivoEffettiva = this.LatitudineArrivoEffettiva;
			toEdit.LongitudineArrivoEffettiva = this.LongitudineArrivoEffettiva;
			return toEdit;
		}
	}

}