using Acheronte.APIs;
using Acheronte.Models;
using Caliburn.Micro;
using System;
using System.Collections.Generic;
using System.Text;
using Windows.UI.Popups;

namespace Virgilio.ViewModels
{
  public class LoginPageViewModel : Screen
  {
    private readonly INavigationService navigationService;

    private string _Username;
    private string _Password;

    public string Username
    {
      get { return _Username; }
      set
      {
        _Username = value;
        NotifyOfPropertyChange(() => Username);
      }
    }

    public string Password
    {
      get { return _Password; }
      set
      {
        _Password = value;
        NotifyOfPropertyChange(() => Password);
      }
    }

    public LoginPageViewModel(INavigationService navigationService)
    {
      this.navigationService = navigationService;
      Username = "gpinelli";
      Password = "alienware";
    }

    public async void BtnLogin()
    {
        OAuth oApi = new OAuth();
        AccessToken at = await oApi.GetToken(Username, Password);
        if (at != null)
        {
            Settings.Instance.AccessToken = at;
            Settings.Instance.Username = Username;
            navigationService.NavigateToViewModel<MenuPageViewModel>();
        }
    }

    public void BtnCancel()
    {
      Username = "";
      Password = "";
    }

  }
}
