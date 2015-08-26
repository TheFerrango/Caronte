using Acheronte.Models;
using SQLite;
using System;
using System.Collections.Generic;
using System.Text;

namespace CaronteMobile.Database
{
    public class Anagrafica
    {
		[PrimaryKey]
		public int IDAnagrafica { get; set; }
		public string CodiceFiscale { set; get; }
		public string Nome { set; get; }
		public string Cognome { set; get; }
		public DateTimeOffset DataNascita { set; get; }
		public string Indirizzo { set; get; }
		public double? Latitude { set; get; }
		public double? Longitude { set; get; }
        public bool Sesso { set; get; }


		public static Anagrafica ToEntity(AnagraficaDTO dto)
		{
			return new Anagrafica()
			{
				IDAnagrafica = dto.IDAnagrafica,
				CodiceFiscale = dto.CodiceFiscale,
				Nome = dto.Nome,
				Cognome = dto.Cognome,
				DataNascita = dto.DataNascita.ToLocalTime(),
				Indirizzo = dto.Indirizzo,
				Latitude = dto.Latitude,
				Longitude = dto.Longitude,
				Sesso = dto.Sesso
			};
		}
    }
}
