using Acheronte.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Acheronte.APIs
{
    public class AnagraficaAPI : BaseApi
    {
        private AccessToken Token;

        public AnagraficaAPI(AccessToken at) :
            base()
        {
            Token = at;
        }

        public async Task<AnagraficaDTO> GetAnagraficaUser(string username)
        {
            httpClient.DefaultRequestHeaders.Clear();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token.access_token);
            string res = await httpClient.GetStringAsync(ComposeUrl("api", "anagrafica", "getbyusername", username));
            return JsonConvert.DeserializeObject<AnagraficaDTO>(res);
        }
    }
}
