using System;
using System.Windows;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Data;

namespace Virgilio.Converters
{
  public class BooleanToInvisibilityConverter : IValueConverter
  {

    public object Convert(object value, Type targetType, object parameter, string language)
    {
      if (value is bool)
      {
        if (System.Convert.ToBoolean(value))
          return Visibility.Collapsed;
        return Visibility.Visible;
      }
      return Visibility.Collapsed;
    }

    public object ConvertBack(object value, Type targetType, object parameter, string language)
    {
      throw new NotImplementedException();
    }
  }
}
