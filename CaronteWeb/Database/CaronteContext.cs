﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace CaronteWeb.Database
{
	public class CaronteContext : DbContext
	{
		public CaronteContext():base(@"Data Source=MDTASG\SQLSERVER2014;Initial Catalog=Caronte;Persist Security Info=True;MultipleActiveResultSets=True;User ID=sa;Password=Mssqlidea2014")
		{
			System.Data.Entity.Database.SetInitializer<CaronteContext>(null);			
		}

		public CaronteContext(string ConnectionString)
			: base(ConnectionString)
		{
			System.Data.Entity.Database.SetInitializer<CaronteContext>(null);
		}

		public DbSet<Stato> Stato { get; set; }
		public DbSet<Ruolo> Ruolo { get; set; }
		public DbSet<Veicolo> Veicolo { get; set; }
		public DbSet<Anagrafica> Anagrafica { get; set; }
		public DbSet<Dipendente> Dipendente { get; set; }
		public DbSet<Viaggio> Viaggio { get; set; }
		public DbSet<Spostamento> Spostamento { get; set; }

	}
}