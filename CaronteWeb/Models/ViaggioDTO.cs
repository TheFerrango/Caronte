using System;
using System.ComponentModel.DataAnnotations;

namespace CaronteWeb.Models
{
	public class ViaggioDTO
	{
		[Key]
public int IDViaggio { set; get; }
public int? FKIDDipendente { set; get; }
public int? FKIDStato { set; get; }
public int? FKIDVeicolo { set; get; }
public string DescrizioneViaggio { set; get; }
public DateTimeOffset DataInizioPrevista { set; get; }
public DateTimeOffset DataFinePrevista { set; get; }
public DateTimeOffset? DataInizioEffettea { set; get; }
public DateTimeOffset? DataFineEffettiva { set; get; }
public  double LatitudinePartenzaPrevista { set; get; }
public  double LongitudinePartenzaPrevista { set; get; }
public  double LatitudineArrivoPrevista { set; get; }
public  double LongitudineArrivoPrevista { set; get; }
public  double? LatitudinePartenzaEffettiva { set; get; }
public  double? LongitudinePartenzaEffettiva { set; get; }
public  double? LatitudineArrivoEffettiva { set; get; }
public  double? LongitudineArrivoEffettiva { set; get; }

	}

}