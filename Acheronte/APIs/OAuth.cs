using Acheronte.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Acheronte.APIs
{
  public class OAuth : BaseApi
  {
    public OAuth():base()
    {
    }

    public async Task<AccessToken> GetToken(string username, string password)
    {
      compraCoop.DefaultRequestHeaders.Clear();
      compraCoop.DefaultRequestHeaders.Add("Content-Type", "application/x-www-form-urlencoded");
      string res = await compraCoop.PostAsync(ComposeUrl("token"), null).Result.Content.ReadAsStringAsync();
      return JsonConvert.DeserializeObject<AccessToken>(res);
    }
  }
}
