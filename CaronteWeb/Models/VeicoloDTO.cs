using System;
using System.ComponentModel.DataAnnotations;

namespace CaronteWeb.Models
{
	public class VeicoloDTO
	{
		[Key]
public int IDVeicolo { set; get; }
public string Targa { set; get; }
public string Modello { set; get; }
public int AnnoProduzione { set; get; }
public DateTimeOffset DataAcquisto { set; get; }
public DateTimeOffset? DataVendita { set; get; }

	}

}