using Acheronte.APIs;
using Acheronte.Models;
using Caliburn.Micro;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Windows.UI.Popups;

namespace Virgilio.ViewModels
{
    public class ViaggioSelectionPageViewModel : Screen
    {
        private readonly INavigationService navigationService;

        public ViaggioSelectionPageViewModel(INavigationService navigationService)
        {
            this.navigationService = navigationService;

        }


    }
}
