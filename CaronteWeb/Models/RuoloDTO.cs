using System;
using System.ComponentModel.DataAnnotations;

namespace CaronteWeb.Models
{
	public class RuoloDTO
	{
		[Key]
public int IDRuolo { set; get; }
public string Descrizione { set; get; }

	}

}