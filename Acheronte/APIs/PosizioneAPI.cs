using Acheronte.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Acheronte.APIs
{
    public class PosizioneAPI: BaseApi
    {
        private AccessToken Token;

        public PosizioneAPI(AccessToken at) :
            base()
        {
            Token = at;
        }

        public async Task<bool> SendPositionData(List<PosizioneDTO> toSend)
        {
            httpClient.DefaultRequestHeaders.Clear();
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", Token.access_token);

            HttpContent httpCont = new StringContent(JsonConvert.SerializeObject(toSend), Encoding.UTF8, "application/json");

            string res = await httpClient.PostAsync(ComposeUrl("api", "posizione"), httpCont).Result.Content.ReadAsStringAsync();
            return Convert.ToBoolean(res);
        }
    }
}
