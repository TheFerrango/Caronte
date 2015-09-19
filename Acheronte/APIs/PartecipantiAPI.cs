using Acheronte.Models;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
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

        public async Task<PartecipanteDTO> UpdatePartecipanteViaggio(PartecipanteDTO part)
        {
          httpClient.DefaultRequestHeaders.Clear();
          httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token.access_token);
          HttpContent httpCont = new StringContent(JsonConvert.SerializeObject(part), Encoding.UTF8, "application/json");
          string res = await httpClient.PostAsync(ComposeUrl("api", "spostamento"), httpCont).Result.Content.ReadAsStringAsync();
          return JsonConvert.DeserializeObject<PartecipanteDTO>(res);
        }
    }
}
