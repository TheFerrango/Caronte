using Acheronte.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
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

        public async Task<ViaggioDTO> UpdateViaggio(ViaggioDTO via)
        {
          httpClient.DefaultRequestHeaders.Clear();
          httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token.access_token);
          HttpContent httpContent = new StringContent(JsonConvert.SerializeObject(via));
          string res = await httpClient.PutAsync(ComposeUrl("api", "viaggio"), httpContent).Result.Content.ReadAsStringAsync();
          return JsonConvert.DeserializeObject<ViaggioDTO>(res);
        }
    }
}
