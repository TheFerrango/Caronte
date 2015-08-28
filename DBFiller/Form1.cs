using CaronteWeb.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Net;
using System.Windows.Forms;

namespace DBFiller
{
	public partial class Form1 : Form
	{
		public Form1()
		{
			InitializeComponent();
			backgroundWorker1.ProgressChanged += backgroundWorker1_ProgressChanged;
		}

		void backgroundWorker1_ProgressChanged(object sender, ProgressChangedEventArgs e)
		{
			textBox2.Text += e.UserState as string;
		}

		WebClient wc = new WebClient();

		private void button1_Click(object sender, EventArgs e)
		{
			backgroundWorker1.WorkerReportsProgress = true;
			
			backgroundWorker1.RunWorkerAsync();
		}

		private void backgroundWorker1_DoWork(object sender, DoWorkEventArgs e)
		{
			//GeneraEAggiungiAnagrafiche(sender);
			GeneraEAggiungiPosizioni(sender);
		}

		private void GeneraEAggiungiPosizioni(object sender)
		{
			List<PosizioneDTO> lAna = LeggiFilePosizioni("elencoPosizioni.txt");

			foreach (var item in lAna)
			{
				item.Data.AddHours(2);
				wc.Headers["Content-Type"] = "application/json";
				wc.UploadString(textBox1.Text + "posizione", "["+JsonConvert.SerializeObject(item)+"]");
				(sender as BackgroundWorker).ReportProgress(1, string.Format("Aggiunta la posizione {0} {1} ", item.Latitudine, item.Longitudine, Environment.NewLine));
			}
		}

		private List<PosizioneDTO> LeggiFilePosizioni(string p)
		{
			string elePoss = File.ReadAllText(p);
			List<PosizioneDTO> poss = JsonConvert.DeserializeObject<List<PosizioneDTO>>(elePoss, new IsoDateTimeConverter { DateTimeFormat = "dd/MM/yyyy HH:mm:ss" });
			return poss;
		}

		#region Anagrafiche

		private void GeneraEAggiungiAnagrafiche(object sender)
		{
			List<AnagraficaDTO> lAna = LeggiFileNomi("elencoNomi.txt");

			foreach (var item in lAna)
			{
				wc.Headers["Content-Type"] = "application/json";
				wc.UploadString(textBox1.Text + "anagrafica", JsonConvert.SerializeObject(item));
				(sender as BackgroundWorker).ReportProgress(1, string.Format("Aggiunta l'anagrafica {0} {1} {2}", item.Nome, item.Cognome, Environment.NewLine));
			}
		}

		private List<AnagraficaDTO> LeggiFileNomi(string p)
		{
			Random rand = new Random();
			List<string> eleNomi = File.ReadAllLines(p).ToList();
			List<AnagraficaDTO> anas = new List<AnagraficaDTO>();

			for (int i = 0; i < 50; i++)
			{				
				 string cognome = eleNomi[rand.Next(0,eleNomi.Count)];
				 string nome= eleNomi[rand.Next(0,eleNomi.Count)];
				DateTimeOffset DataNasc = DateTimeOffset.Now;
				string cf = ((cognome + nome).Replace("a", String.Empty)
												  .Replace("e", String.Empty)
												  .Replace("i", String.Empty)
												  .Replace("o", String.Empty)
												  .Replace("u", String.Empty) + DataNasc.DateTime.ToShortDateString()).PadLeft(16, 'B')
									.Substring(0, 16);

			 anas.Add(new AnagraficaDTO(){
				 Cognome = cognome,
				 Nome= nome,
				 CodiceFiscale =  cf,
				DataNascita = DataNasc,
				Indirizzo = "Via della siesta " + rand.Next(0,150),
				Longitude = (rand.Next(40)%2 == 0 ? -1 : 1) * rand.NextDouble()*180,
				Latitude = (rand.Next(40)%2 == 0 ? -1 : 1) *rand.NextDouble()*90 
			 });
			}

			return anas;

		}

		#endregion
	}
}
