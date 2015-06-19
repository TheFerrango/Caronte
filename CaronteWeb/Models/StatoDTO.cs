using System;
using System.ComponentModel.DataAnnotations;

namespace CaronteWeb.Models
{
	public class StatoDTO
	{
		[Key]
		public int IDStato { set; get; }
		public string Descrizione { set; get; }

	}

}