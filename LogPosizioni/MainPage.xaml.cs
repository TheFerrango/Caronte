using Microsoft.Phone.Controls;
using Microsoft.Phone.Tasks;
using System.Device.Location;
using System.IO;
using System.IO.IsolatedStorage;
using System.Windows;

namespace LogPosizioni
{
	public partial class MainPage : PhoneApplicationPage
	{
		bool isTracking;
		GeoCoordinateWatcher gcw;
		GeoCoordinate gc;
		// Constructor
		public MainPage()
		{
			InitializeComponent();
			isTracking = false;
		}

		private void btnTrack_Tap(object sender, System.Windows.Input.GestureEventArgs e)
		{
			
			if(isTracking)
			{
				btnTrack.Content = "Inizia tracciamento";
				gcw.Stop();
			}
			else
			{
				btnTrack.Content = "Termina tracciamento";
				gcw.Start();
			}

			isTracking = !isTracking;
		}

		private void btnManda_Tap(object sender, System.Windows.Input.GestureEventArgs e)
		{
			if (isTracking)
			{
				btnTrack.Content = "Inizia tracciamento";
				gcw.Stop();
			}

			string toSend = ReadFile();
			
			if (MessageBox.Show("Cancellare il file delle posizioni inviate?", "Domanda", MessageBoxButton.OKCancel) == MessageBoxResult.OK)
				DeleteFile();

			EmailComposeTask ect = new EmailComposeTask();
			ect.To = "theferrango@outlook.com";
			ect.Subject = "GPS coords foar Caronte";
			ect.Body = "[" + toSend + "]";
			ect.Show();
		}

		private void PhoneApplicationPage_Loaded(object sender, RoutedEventArgs e)
		{
			gc = new GeoCoordinate();
			gcw = new GeoCoordinateWatcher();
			gcw.MovementThreshold = 10;
			gcw.PositionChanged += gcw_PositionChanged;
		}

		void gcw_PositionChanged(object sender, GeoPositionChangedEventArgs<GeoCoordinate> e)
		{
			lat.Text = e.Position.Location.Latitude.ToString();
			lon.Text = e.Position.Location.Longitude.ToString();
			alt.Text = e.Position.Location.Altitude.ToString();
			pre.Text = e.Position.Location.HorizontalAccuracy.ToString();
			SaveFile(string.Format("{{ 'IDPosizione' : 0, 'FKIDViaggio' : 1, 'Data': \"{0}\", 'Latitudine': {1}, 'Longitudine': {2}, 'Precisione:' {3}}},",e.Position.Timestamp.ToString(), e.Position.Location.Latitude, e.Position.Location.Longitude, e.Position.Location.HorizontalAccuracy));
		}

		public void SaveFile(string data)
		{
			using (IsolatedStorageFile storage = IsolatedStorageFile.GetUserStoreForApplication())
			{
				using (var fileStream = new IsolatedStorageFileStream("posizioni.gps", FileMode.Append, FileAccess.Write, storage))
				{
					using (StreamWriter writer = new StreamWriter(fileStream))
					{
						writer.WriteLine(data);
						writer.Close();
					}
					fileStream.Close();
				}
			}
		}

		public string ReadFile()
		{
			string dati = "";
			using (IsolatedStorageFile storage = IsolatedStorageFile.GetUserStoreForApplication())
			{
				using (var fileStream = new IsolatedStorageFileStream("posizioni.gps", FileMode.Open, FileAccess.Read, storage))
				{
					using (StreamReader reader = new StreamReader(fileStream))
					{
						dati = reader.ReadToEnd();
						reader.Close();
					}
					fileStream.Close();
				}
			}
			return dati;
		}

		public void DeleteFile()
		{			
			using (IsolatedStorageFile storage = IsolatedStorageFile.GetUserStoreForApplication())
			{
				storage.DeleteFile("posizioni.gps");
			}
		}
	}
}