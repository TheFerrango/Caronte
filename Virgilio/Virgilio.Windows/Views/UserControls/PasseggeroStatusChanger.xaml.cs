using Bing.Maps;
using CaronteMobile.Database;
using CaronteMobile.Support;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// The User Control item template is documented at http://go.microsoft.com/fwlink/?LinkId=234236

namespace CaronteMobile.Views.UserControls
{
	public sealed partial class PasseggeroStatusChanger : UserControl
	{
		Popup containerPopup;
		Spostamento partecipante;
		Location location;
		Database.DBManager dbMan;
		public PasseggeroStatusChanger(Popup containerPopup, Spostamento partecipante, Location location)
		{
			this.InitializeComponent();
			this.containerPopup = containerPopup;
			this.partecipante = partecipante;
			this.location = location;
			dbMan = new DBManager();
		}

		private void backButton_Tapped(object sender, TappedRoutedEventArgs e)
		{
			containerPopup.IsOpen = false;
		}

		private void UserControl_Loaded(object sender, RoutedEventArgs e)
		{
			lblNomePass.Text = partecipante.PartecipanteObj.NOMINATIVO;
			lblSaleScende.Text = String.Format("Sta {0} all'indirizzo: {1}", 
				partecipante.PartecipanteObj.FKIDStato == 1 ? "salendo" : "scendendo", 
				partecipante.PartecipanteObj.FKIDStato == 1 ? partecipante.PartecipanteObj.IndirizzoSalita : partecipante.PartecipanteObj.IndirizzoDiscesa);
			lblOrario.Text = String.Format("Alle ore: {0}. (orario previsto: {1})", 
				DateTime.Now.ToString("HH:mm"), 
				partecipante.PartecipanteObj.FKIDStato == 1 ? partecipante.PartecipanteObj.DataSalitaPrevista.ToString("HH:mm") : partecipante.PartecipanteObj.DataDiscesaPrevista.ToString("HH:mm"));
		}

		private void forwardButton_Tapped(object sender, TappedRoutedEventArgs e)
		{
			if (partecipante.PartecipanteObj.FKIDStato == 1)
			{
				partecipante.PartecipanteObj.LatitudineSalitaEffettiva = location.Latitude;
				partecipante.PartecipanteObj.LongitudineSalitaEffettiva = location.Longitude;
				partecipante.PartecipanteObj.DataSalitaEffettiva = DateTimeOffset.Now;
			}else
			{
				partecipante.PartecipanteObj.LatitudineDiscesaEffettiva = location.Latitude;
				partecipante.PartecipanteObj.LongitudineDiscesaEffettiva = location.Longitude;
				partecipante.PartecipanteObj.DataDiscesaEffettiva = DateTimeOffset.Now;

			}

			partecipante.PartecipanteObj.FKIDStato++;


			dbMan.cmDB.UpdateAsync(partecipante.PartecipanteObj);
			containerPopup.IsOpen = false;
		}
	}
}
