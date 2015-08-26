using Acheronte.Models;
using CaronteMobile.Database;
using SQLite;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Windows.Storage;

namespace CaronteMobile.Database
{
	public class DBManager
	{
		SQLiteAsyncConnection sqlConn;

		public SQLiteAsyncConnection cmDB
		{
			get { return sqlConn; }
		}

		public DBManager()
		{
			sqlConn = new SQLiteAsyncConnection("carontemob.db");
		}

		public async Task<bool> MakeStartupChecks()
		{
			if (!await CheckIfDBExists())
				await CreateTables();
			return true;
		}

		private async Task<bool> CheckIfDBExists()
		{
			try
			{
				StorageFile sf = await ApplicationData.Current.LocalFolder.GetFileAsync("carontemob.db");
			}
			catch (Exception)
			{

				return false;
			}
			return true;
		}

		private async Task<bool> CreateTables()
		{
			try
			{
				await sqlConn.CreateTableAsync<Anagrafica>();
				await sqlConn.CreateTableAsync<Dipendente>();
				await sqlConn.CreateTableAsync<Partecipante>();
				await sqlConn.CreateTableAsync<Posizione>();
				await sqlConn.CreateTableAsync<Viaggio>();

			}
			catch (Exception)
			{
				return false;
			}
			return true;
		}


	}
}
