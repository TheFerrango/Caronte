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
		public string IndirizzoPartenza { set; get; }
		public string IndirizzoArrivo { set; get; }
		public DateTimeOffset DataInizioPrevista { set; get; }
		public DateTimeOffset DataFinePrevista { set; get; }
		public DateTimeOffset? DataInizioEffettiva { set; get; }
		public DateTimeOffset? DataFineEffettiva { set; get; }
		public double LatitudinePartenzaPrevista { set; get; }
		public double LongitudinePartenzaPrevista { set; get; }
		public double LatitudineArrivoPrevista { set; get; }
		public double LongitudineArrivoPrevista { set; get; }
		public double? LatitudinePartenzaEffettiva { set; get; }
		public double? LongitudinePartenzaEffettiva { set; get; }
		public double? LatitudineArrivoEffettiva { set; get; }
		public double? LongitudineArrivoEffettiva { set; get; }

		public string STATO_DESC { set; get; }

		public Viaggio ToEntity()
		{
			return new Viaggio()
			{
				FKIDDipendente = this.FKIDDipendente,
				FKIDStato = this.FKIDStato,
				FKIDVeicolo = this.FKIDVeicolo,
				DescrizioneViaggio = string.IsNullOrWhiteSpace(this.DescrizioneViaggio) ? null : this.DescrizioneViaggio,
				IndirizzoPartenza = this.IndirizzoPartenza,
				IndirizzoArrivo = this.IndirizzoArrivo,
				DataInizioPrevista = this.DataInizioPrevista.ToLocalTime(),
				DataFinePrevista = this.DataFinePrevista.ToLocalTime(),
				DataInizioEffettiva = (this.DataInizioEffettiva.HasValue ? (DateTimeOffset?)this.DataInizioEffettiva.Value.ToLocalTime() : null),
				DataFineEffettiva = (this.DataFineEffettiva.HasValue ? (DateTimeOffset?)this.DataFineEffettiva.Value.ToLocalTime() : null),
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
			toEdit.IndirizzoPartenza = this.IndirizzoPartenza;
			toEdit.IndirizzoArrivo = this.IndirizzoArrivo;
			toEdit.DataInizioPrevista = this.DataInizioPrevista.ToLocalTime();
			toEdit.DataFinePrevista = this.DataFinePrevista.ToLocalTime();
			toEdit.DataInizioEffettiva = (this.DataInizioEffettiva.HasValue ? (DateTimeOffset?)this.DataInizioEffettiva.Value.ToLocalTime() : null);
			toEdit.DataFineEffettiva = (this.DataFineEffettiva.HasValue ? (DateTimeOffset?)this.DataFineEffettiva.Value.ToLocalTime() : null);
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