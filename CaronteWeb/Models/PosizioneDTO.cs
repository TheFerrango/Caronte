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


		public Posizione ToEntity()
		{
			return new Posizione()
			{
				FKIDViaggio = this.FKIDViaggio,
				Data = this.Data,
				Latitudine = this.Latitudine,
				Longitudine = this.Longitudine
			};
		}

		public Posizione ToEntity(Posizione toEdit)
		{
			toEdit.FKIDViaggio = this.FKIDViaggio;
			toEdit.Data = this.Data;
			toEdit.Latitudine = this.Latitudine;
			toEdit.Longitudine = this.Longitudine;
			return toEdit;
		}
	}

}