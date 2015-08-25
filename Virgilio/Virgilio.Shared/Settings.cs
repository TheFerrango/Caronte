using Acheronte.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Virgilio
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

        public AccessToken AccessToken { get; set; }

        public AnagraficaDTO AnagraficaUtente { get; set; }
        public DipendenteDTO DipendenteInfo { get; set; }

        public ViaggioDTO SelectedViaggio { get; set; }

        public string Username { get; set; }
    }
}
