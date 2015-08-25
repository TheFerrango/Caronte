using Acheronte.Models;
using System;
using System.Collections.Generic;
using System.Text;
using Windows.Networking.Connectivity;

namespace CaronteMobile
{
    public class Settings
    {
        private static Settings _instance ;

        public static Settings Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new Settings();
                }
                return _instance;
            }
        }

        public static bool IsConnectedToInternet()
        {
            ConnectionProfile connectionProfile = NetworkInformation.GetInternetConnectionProfile();
            return (connectionProfile != null && connectionProfile.GetNetworkConnectivityLevel() == NetworkConnectivityLevel.InternetAccess);
        }

        public AccessToken AccessToken { get; set; }

        public AnagraficaDTO AnagraficaUtente { get; set; }
        public DipendenteDTO DipendenteInfo { get; set; }

        public ViaggioDTO SelectedViaggio { get; set; }

        public string Username { get; set; }

        public int MaxBufferSeconds { get; set; }
    }
}
