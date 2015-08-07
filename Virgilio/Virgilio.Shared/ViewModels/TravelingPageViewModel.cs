using Acheronte.APIs;
using Acheronte.Models;
using Caliburn.Micro;
using System;
using System.Collections.Generic;
using System.Text;
using Windows.UI.Popups;

namespace Virgilio.ViewModels
{
  public class TravelingPageViewModel : Screen
  {
    private readonly INavigationService navigationService;


    public TravelingPageViewModel(INavigationService navigationService)
    {
      this.navigationService = navigationService;   
    }

  }
}
