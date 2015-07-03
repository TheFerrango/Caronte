using CaronteWeb.Database;
using System;
using System.ComponentModel.DataAnnotations;

namespace CaronteWeb.Models
{
	public class AnagraficaDTO : IDTO<Anagrafica>
	{
		[Key]
		public int IDAnagrafica { set; get; }
		public string CodiceFiscale { set; get; }
		public string Nome { set; get; }
		public string Cognome { set; get; }
		public DateTimeOffset DataNascita { set; get; }
		public string Indirizzo { set; get; }
		public double? Latitude { set; get; }
		public double? Longitude { set; get; }
		public bool Sesso { set; get; }
		public string Telefono { set; get; }
		public string Cellulare { set; get; }
		public string Email { set; get; }

		public Anagrafica ToEntity()
		{
			return new Anagrafica()
			{
				CodiceFiscale = this.CodiceFiscale,
				Nome = this.Nome,
				Cognome = this.Cognome,
				DataNascita = this.DataNascita,
				Indirizzo = this.Indirizzo,
				Latitude = this.Latitude,
				Longitude = this.Longitude,
				Sesso = this.Sesso,
				Telefono = this.Telefono,
				Cellulare = this.Cellulare,
				Email = this.Email
			};
		}

		public Anagrafica ToEntity(Anagrafica toEdit)
		{
			toEdit.CodiceFiscale = this.CodiceFiscale;
			toEdit.Nome = this.Nome;
			toEdit.Cognome = this.Cognome;
			toEdit.DataNascita = this.DataNascita;
			toEdit.Indirizzo = this.Indirizzo;
			toEdit.Latitude = this.Latitude;
			toEdit.Longitude = this.Longitude;
			toEdit.Sesso = this.Sesso;
			toEdit.Telefono = this.Telefono;
			toEdit.Cellulare = this.Cellulare;
			toEdit.Email = this.Email;
			return toEdit;
		}
	}


}