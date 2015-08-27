using Acheronte.Models;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Acheronte.APIs
{
    public class DipendenteAPI: BaseApi
    {

           private AccessToken Token;

        public DipendenteAPI(AccessToken at) :
            base()
        {
            Token = at;
        }

        public async Task<DipendenteDTO> GetDipendenteByUsername(string username)
        {
            httpClient.DefaultRequestHeaders.Clear();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token.access_token);
            string res = await httpClient.GetStringAsync(ComposeUrl("api", "dipendente", "getbyusername", username));
            return JsonConvert.DeserializeObject<DipendenteDTO>(res);
        }
    }
}
