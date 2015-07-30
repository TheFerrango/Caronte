using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Windows.Devices.Geolocation;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.Storage;
using Windows.Storage.Streams;
using Windows.System.Display;
using Windows.UI.Popups;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// The Blank Page item template is documented at http://go.microsoft.com/fwlink/?LinkId=234238

namespace LogPosizioneTablet
{
	/// <summary>
	/// An empty page that can be used on its own or navigated to within a Frame.
	/// </summary>
	public sealed partial class MainPage : Page
	{
		bool isTracking;
		Geolocator geoLoc;
		private DisplayRequest dRequest;
		string fileNameBase = @"posizioni-{0}.gps";
		string startTime;

		public MainPage()
		{
			this.InitializeComponent();
			isTracking = false;
		}

		private void btnTrack_Click(object sender, RoutedEventArgs e)
		{

			if (isTracking)
			{
				btnTrack.Content = "Inizia tracciamento";
				dRequest.RequestRelease();
			}
			else
			{
				btnTrack.Content = "Termina tracciamento";
				startTime = DateTime.Now.ToString("yyyyMMdd-HHmm");
				dRequest.RequestActive();
			}

			isTracking = !isTracking;
		}

		private async void btnManda_Click(object sender, RoutedEventArgs e)
		{
			if (isTracking)
			{
				btnTrack.Content = "Inizia tracciamento";
				geoLoc = null;
			}

			try
			{
				string toSend = await ReadFileContentsAsync();

				MessageDialog md = new MessageDialog("Cancellare il file delle posizioni inviate?", "Domanda");
				UICommand okBtn = new UICommand("SI");

				okBtn.Invoked = (IUICommand cmd) =>
				{
					DeleteFile();
				};
				md.Commands.Add(okBtn);

				//Cancel Button
				UICommand cancelBtn = new UICommand("No");
				cancelBtn.Invoked = (IUICommand cmd) =>
				{
				};
				md.Commands.Add(cancelBtn);

				//Show message
				await md.ShowAsync();


				var mailto = new Uri("mailto:?to=theferrango@outlook.com&subject=GPS coords foar Caronte&body=[" + toSend + "]");
				await Windows.System.Launcher.LaunchUriAsync(mailto);

			}
			catch
			{
				//MessageBox.Show("Impossibile caricare le posizioni, file non presente");
			}
		}

		private void Page_Loaded(object sender, RoutedEventArgs e)
		{
			dRequest = new DisplayRequest();

			geoLoc = new Geolocator();
			geoLoc.MovementThreshold = 1;
			geoLoc.PositionChanged += geoLoc_PositionChanged;

			var folder = ApplicationData.Current.LocalFolder;
			this.filePath.Text = folder.Path;

		}

		async void geoLoc_PositionChanged(Geolocator sender, PositionChangedEventArgs args)
		{
			if (isTracking)
			{
				Windows.ApplicationModel.Core.CoreApplication.MainView.CoreWindow.Dispatcher.RunAsync
				(Windows.UI.Core.CoreDispatcherPriority.Normal, () =>
				{
					lat.Text = args.Position.Coordinate.Point.Position.Latitude.ToString();
					lon.Text = args.Position.Coordinate.Point.Position.Longitude.ToString();
					alt.Text = args.Position.Coordinate.Point.Position.Altitude.ToString();
					pre.Text = args.Position.Coordinate.Accuracy.ToString();
				});


				await WriteDataToFileAsync(string.Format("{{ 'IDPosizione' : 0, 'FKIDViaggio' : 1, 'Data': \"{0}\", 'Latitudine': {1}, 'Longitudine': {2}, 'Precisione': {3}}},",
					args.Position.Coordinate.Timestamp.ToString(),
					args.Position.Coordinate.Point.Position.Latitude,
					args.Position.Coordinate.Point.Position.Longitude,
					args.Position.Coordinate.Accuracy));
			}
		}


		public async Task WriteDataToFileAsync(string content)
		{

			var folder = ApplicationData.Current.LocalFolder;
			var file = await folder.CreateFileAsync(string.Format(fileNameBase, startTime), CreationCollisionOption.OpenIfExists);

			await Windows.Storage.FileIO.AppendTextAsync(file, content);

			return;
		}

		public async Task<string> ReadFileContentsAsync()
		{
			var folder = ApplicationData.Current.LocalFolder;

			try
			{
				var file = await folder.OpenStreamForReadAsync("posizioni.gps");

				using (var streamReader = new StreamReader(file))
				{
					return streamReader.ReadToEnd();
				}
			}
			catch (Exception)
			{
				return string.Empty;
			}
		}


		public async void DeleteFile()
		{
			var folder = ApplicationData.Current.LocalFolder;



			var file = await folder.CreateFileAsync("posizioni.gps", CreationCollisionOption.OpenIfExists);
			await file.DeleteAsync(StorageDeleteOption.PermanentDelete);
		}

	}
}
