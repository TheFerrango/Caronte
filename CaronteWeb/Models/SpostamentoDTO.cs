using System;
using System.ComponentModel.DataAnnotations;

namespace CaronteWeb.Models
{
	public class SpostamentoDTO
	{
		[Key]
public int IDSpostamento { set; get; }
public int? FKIDAnagrafica { set; get; }
public int? FKIDViaggio { set; get; }
public int? FKIDStato { set; get; }
public string DescrizioneViaggio { set; get; }
public DateTimeOffset DataSalitaPrevista { set; get; }
public DateTimeOffset DataDiscesaPrevista { set; get; }
public DateTimeOffset? DataSalitaEffettea { set; get; }
public DateTimeOffset? DataDiscesaEffettiva { set; get; }
public  double LatitudineSalitaPrevista { set; get; }
public  double LongitudineSalitaPrevista { set; get; }
public  double LatitudineDiscesaPrevista { set; get; }
public  double LongitudineDiscesaPrevista { set; get; }
public  double? LatitudineSalitaEffettiva { set; get; }
public  double? LongitudineSalitaEffettiva { set; get; }
public  double? LatitudineDiscesaEffettiva { set; get; }
public  double? LongitudineDiscesaEffettiva { set; get; }

	}

}