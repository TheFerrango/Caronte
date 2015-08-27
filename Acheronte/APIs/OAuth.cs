using Acheronte.Models;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Acheronte.APIs
{
    public class OAuth : BaseApi
    {
        public OAuth()
            : base()
        {
        }

        public async Task<AccessToken> GetToken(string username, string password)
        {
            httpClient.DefaultRequestHeaders.Clear();

            HttpContent httpCont = new StringContent(string.Format("grant_type=password&username={0}&password={1}", username, password), Encoding.UTF8, "application/x-www-form-urlencoded");

            string res = await httpClient.PostAsync(ComposeUrl("token"), httpCont).Result.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<AccessToken>(res);
        }
    }
}
