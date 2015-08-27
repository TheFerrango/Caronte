using CaronteMobile.Database;
using System;

namespace CaronteMobile.Support
{
    public class Spostamento
    {
		public DateTimeOffset Orario { get { return PartecipanteObj.FKIDStato == 1 ? PartecipanteObj.DataSalitaPrevista : PartecipanteObj.DataDiscesaPrevista; } }
		public double Latitudine { get { return PartecipanteObj.FKIDStato == 1 ? PartecipanteObj.LatitudineSalitaPrevista : PartecipanteObj.LatitudineDiscesaPrevista; } }
		public double Longitudine { get { return PartecipanteObj.FKIDStato == 1 ? PartecipanteObj.LongitudineSalitaPrevista : PartecipanteObj.LongitudineDiscesaPrevista; } }
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
