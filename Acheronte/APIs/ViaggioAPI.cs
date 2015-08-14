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
    public class ViaggioAPI: BaseApi
    {
        private AccessToken Token;

        public ViaggioAPI(AccessToken at) :
            base()
        {
            Token = at;
        }

        public async Task<List<ViaggioDTO>> GetViaggiByAutista(int IDAutista)
        {
            httpClient.DefaultRequestHeaders.Clear();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token.access_token);
            string res = await httpClient.GetStringAsync(ComposeUrl("api", "viaggio", "getviaggibyautista", IDAutista.ToString()));
            return JsonConvert.DeserializeObject<List<ViaggioDTO>>(res);
        }
    }
}
