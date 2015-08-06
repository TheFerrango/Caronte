using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Acheronte.APIs
{
  public abstract class BaseApi
  {
    internal HttpClient compraCoop;
    internal readonly string BaseUrl = "http://serverAddress/";

    public Uri ComposeUrl( params string[] uriComponents)
    {
      string addUriComp = String.Join("/", uriComponents);
      return new Uri(BaseUrl + addUriComp);
    }

    public BaseApi()
    {
      compraCoop = new HttpClient();
    }
  }
}
