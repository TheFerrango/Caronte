using Acheronte.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Acheronte.APIs
{
    public class PartecipantiAPI:BaseApi
    {
          private AccessToken Token;

          public PartecipantiAPI(AccessToken at) :
            base()
        {
            Token = at;
        }

        public async Task<List<PartecipanteDTO>> GetPartecipantiViaggio(int IDViaggio)
        {
            httpClient.DefaultRequestHeaders.Clear();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token.access_token);
            string res = await httpClient.GetStringAsync(ComposeUrl("api", "spostamento", "getpartecipantiviaggio", IDViaggio.ToString()));
            return JsonConvert.DeserializeObject<List<PartecipanteDTO>>(res);
        }
    }
}
