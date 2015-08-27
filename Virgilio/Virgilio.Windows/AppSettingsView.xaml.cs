using System;
using System.Threading.Tasks;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;

// The Settings Flyout item template is documented at http://go.microsoft.com/fwlink/?LinkId=273769

namespace CaronteMobile
{
    public sealed partial class AppSettingsView : SettingsFlyout
    {
        public AppSettingsView()
        {
            this.InitializeComponent();
        }

        private async void SliderInteval_ValueChanged(object sender, RangeBaseValueChangedEventArgs e)
        {
			if (e.OldValue != 0)
			{

				Settings.Instance.MaxBufferSeconds = Convert.ToInt32(e.NewValue);
				while (secsText == null)
				{
					await Task.Delay(TimeSpan.FromMilliseconds(10));
				}
				secsText.Text = Settings.Instance.MaxBufferSeconds.ToString();
			}
        }

        private void SettingsFlyout_Loaded(object sender, RoutedEventArgs e)
        {
            this.SliderInteval.Value = Settings.Instance.MaxBufferSeconds;
        }
    }
}
