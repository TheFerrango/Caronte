using Acheronte.Models;
using SQLite;
using System;
using System.Collections.Generic;
using System.Text;

namespace CaronteMobile.Database
{
    public class Viaggio
    {
		[PrimaryKey]
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

		public static Viaggio ToEntity(ViaggioDTO dto)
		{
			return new Viaggio()
			{
				IDViaggio = dto.IDViaggio,
				FKIDDipendente = dto.FKIDDipendente,
				FKIDStato = dto.FKIDStato,
				FKIDVeicolo = dto.FKIDVeicolo,
				DescrizioneViaggio = string.IsNullOrWhiteSpace(dto.DescrizioneViaggio) ? null : dto.DescrizioneViaggio,
				IndirizzoPartenza = dto.IndirizzoPartenza,
				IndirizzoArrivo = dto.IndirizzoArrivo,
				DataInizioPrevista = dto.DataInizioPrevista,
				DataFinePrevista = dto.DataFinePrevista,
				DataInizioEffettiva = dto.DataInizioEffettiva,
				DataFineEffettiva = dto.DataFineEffettiva,
				LatitudinePartenzaPrevista = dto.LatitudinePartenzaPrevista,
				LongitudinePartenzaPrevista = dto.LongitudinePartenzaPrevista,
				LatitudineArrivoPrevista = dto.LatitudineArrivoPrevista,
				LongitudineArrivoPrevista = dto.LongitudineArrivoPrevista,
				LatitudinePartenzaEffettiva = dto.LatitudinePartenzaEffettiva,
				LongitudinePartenzaEffettiva = dto.LongitudinePartenzaEffettiva,
				LatitudineArrivoEffettiva = dto.LatitudineArrivoEffettiva,
				LongitudineArrivoEffettiva = dto.LongitudineArrivoEffettiva,

				STATO_DESC = dto.STATO_DESC
			};
		}
    }

}