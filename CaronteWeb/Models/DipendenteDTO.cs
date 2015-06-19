using System;
using System.ComponentModel.DataAnnotations;

namespace CaronteWeb.Models
{
	public class DipendenteDTO
	{
		[Key]
public int IDDipendente { set; get; }
public int? FKIDAnagrafica { set; get; }
public int? FKIDRuolo { set; get; }
public string Password { set; get; }
public DateTimeOffset DipendenteDal { set; get; }
public DateTimeOffset DipendenteAl { set; get; }
public bool Attivo { set; get; }

	}

}