using System;
using System.Windows;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Data;

namespace Virgilio.Converters
{
    public class DateTimeOffsetToDateTimeStringConverter : IValueConverter
  {

    public object Convert(object value, Type targetType, object parameter, string language)
    {
      if (value is DateTimeOffset)
      {
          return ((DateTimeOffset)value).ToString("dd/MM/yyyy HH:mm");
      }
      return "Data non valida";
    }

    public object ConvertBack(object value, Type targetType, object parameter, string language)
    {
      throw new NotImplementedException();
    }
  }
}
