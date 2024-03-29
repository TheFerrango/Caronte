using CaronteWeb.Database;
using System;
using System.ComponentModel.DataAnnotations;

namespace CaronteWeb.Models
{
	public class PosizioneDTO : IDTO<Posizione>
	{
		[Key]
		public int IDPosizione { set; get; }
		public int? FKIDViaggio { set; get; }
		public DateTimeOffset Data { set; get; }
		public double Latitudine { set; get; }
		public double Longitudine { set; get; }
		public double Precisione { set; get; }
		

		public Posizione ToEntity()
		{
			return new Posizione()
			{
				FKIDViaggio = this.FKIDViaggio,
				Data = this.Data,
				Latitudine = this.Latitudine,
				Longitudine = this.Longitudine,
				Precisione = this.Precisione
			};
		}

		public Posizione ToEntity(Posizione toEdit)
		{
			toEdit.FKIDViaggio = this.FKIDViaggio;
			toEdit.Data = this.Data.ToLocalTime();
			toEdit.Latitudine = this.Latitudine;
			toEdit.Longitudine = this.Longitudine;
			toEdit.Precisione = this.Precisione;
			return toEdit;
		}
	}

}