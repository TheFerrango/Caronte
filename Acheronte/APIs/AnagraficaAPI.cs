using Acheronte.Models;
using Newtonsoft.Json;
using System.Net.Http.Headers;
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

        public async Task<AnagraficaDTO> GetAnagrafica(int IDAnagrafica)
        {
            httpClient.DefaultRequestHeaders.Clear();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token.access_token);
            string res = await httpClient.GetStringAsync(ComposeUrl("api", "anagrafica", IDAnagrafica.ToString()));
            return JsonConvert.DeserializeObject<AnagraficaDTO>(res);
        }
    }
}
