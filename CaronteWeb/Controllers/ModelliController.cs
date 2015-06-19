using CaronteWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CaronteWeb.Controllers
{
    public class ModelliController : ApiController
    {
		Modello[] products = new Modello[] 
        { 
            new Modello { ID= 1, Descrizione= "Modello #1"},
            new Modello { ID= 2, Descrizione= "Modello #2"},
            new Modello { ID= 3, Descrizione= "Modello #3"},
            new Modello { ID= 4, Descrizione= "Modello #4"},

        };

		public IEnumerable<Modello> GetAllProducts()
		{
			return products;
		}

		public IHttpActionResult GetProduct(int id)
		{
			var product = products.FirstOrDefault((p) => p.ID == id);
			if (product == null)
			{
				return NotFound();
			}
			return Ok(product);
		}
    }
}
