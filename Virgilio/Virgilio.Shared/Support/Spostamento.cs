using CaronteMobile.Database;
using System;
using System.Collections.Generic;
using System.Text;

namespace CaronteMobile.Support
{
    public class Spostamento
    {
		public DateTimeOffset Orario { get { return PartecipanteObj.FKIDViaggio == 1 ? PartecipanteObj.DataSalitaPrevista : PartecipanteObj.DataDiscesaPrevista; } }
		public double Latitudine { get { return PartecipanteObj.FKIDViaggio == 1 ? PartecipanteObj.LatitudineSalitaPrevista : PartecipanteObj.LatitudineDiscesaPrevista; } }
		public double Longitudine { get { return PartecipanteObj.FKIDViaggio == 1 ? PartecipanteObj.LongitudineSalitaPrevista : PartecipanteObj.LongitudineDiscesaPrevista; } }
		public Partecipante PartecipanteObj {get; set;}

		public static Spostamento FromPartecipante(Partecipante part)
		{
			return new Spostamento()
			{
				PartecipanteObj = part
			};
		}
    }

	
}
