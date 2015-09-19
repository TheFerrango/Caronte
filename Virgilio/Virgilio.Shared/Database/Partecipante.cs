using Acheronte.Models;
using SQLite;
using System;

namespace CaronteMobile.Database
{
	public class Partecipante
	{
		[PrimaryKey]
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
		public string STATO_DESC { set; get; }
    public bool NeedsSending { get; set; }

		public PartecipanteDTO ToDTO()
		{
			return new PartecipanteDTO()
			{
				IDSpostamento = this.IDSpostamento,
				FKIDAnagrafica = this.FKIDAnagrafica,
				FKIDViaggio = this.FKIDViaggio,
				FKIDStato = this.FKIDStato,
				DescrizioneViaggio = string.IsNullOrWhiteSpace(this.DescrizioneViaggio) ? null : this.DescrizioneViaggio,
				IndirizzoSalita = this.IndirizzoSalita,
				IndirizzoDiscesa = this.IndirizzoDiscesa,
				DataSalitaPrevista = this.DataSalitaPrevista,
				DataDiscesaPrevista = this.DataDiscesaPrevista,
				DataSalitaEffettiva = this.DataSalitaEffettiva,
				DataDiscesaEffettiva = this.DataDiscesaEffettiva,
				LatitudineSalitaPrevista = this.LatitudineSalitaPrevista,
				LongitudineSalitaPrevista = this.LongitudineSalitaPrevista,
				LatitudineDiscesaPrevista = this.LatitudineDiscesaPrevista,
				LongitudineDiscesaPrevista = this.LongitudineDiscesaPrevista,
				LatitudineSalitaEffettiva = this.LatitudineSalitaEffettiva,
				LongitudineSalitaEffettiva = this.LongitudineSalitaEffettiva,
				LatitudineDiscesaEffettiva = this.LatitudineDiscesaEffettiva,
				LongitudineDiscesaEffettiva = this.LongitudineDiscesaEffettiva,

				NOMINATIVO = this.NOMINATIVO,
				STATO_DESC = this.STATO_DESC,        
			};
		}

		public static Partecipante ToEntity(PartecipanteDTO dto)
		{
			return new Partecipante()
			{
				IDSpostamento = dto.IDSpostamento,
				FKIDAnagrafica = dto.FKIDAnagrafica,
				FKIDViaggio = dto.FKIDViaggio,
				FKIDStato = dto.FKIDStato,
				DescrizioneViaggio = string.IsNullOrWhiteSpace(dto.DescrizioneViaggio) ? null : dto.DescrizioneViaggio,
				IndirizzoSalita = dto.IndirizzoSalita,
				IndirizzoDiscesa = dto.IndirizzoDiscesa,
				DataSalitaPrevista = dto.DataSalitaPrevista,
				DataDiscesaPrevista = dto.DataDiscesaPrevista,
				DataSalitaEffettiva = dto.DataSalitaEffettiva,
				DataDiscesaEffettiva = dto.DataDiscesaEffettiva,
				LatitudineSalitaPrevista = dto.LatitudineSalitaPrevista,
				LongitudineSalitaPrevista = dto.LongitudineSalitaPrevista,
				LatitudineDiscesaPrevista = dto.LatitudineDiscesaPrevista,
				LongitudineDiscesaPrevista = dto.LongitudineDiscesaPrevista,
				LatitudineSalitaEffettiva = dto.LatitudineSalitaEffettiva,
				LongitudineSalitaEffettiva = dto.LongitudineSalitaEffettiva,
				LatitudineDiscesaEffettiva = dto.LatitudineDiscesaEffettiva,
				LongitudineDiscesaEffettiva = dto.LongitudineDiscesaEffettiva,

				NOMINATIVO = dto.NOMINATIVO,
				STATO_DESC = dto.STATO_DESC,
			};
		}
	}

}