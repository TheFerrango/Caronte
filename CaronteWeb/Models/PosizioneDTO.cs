using System;
using System.ComponentModel.DataAnnotations;

namespace CaronteWeb.Models
{
	public class PosizioneDTO
	{
		[Key]
public int IDPosizione { set; get; }
public int? FKIDViaggio { set; get; }
public DateTimeOffset Data { set; get; }
public  double Latitudine { set; get; }
public  double Longitudine { set; get; }

	}

}