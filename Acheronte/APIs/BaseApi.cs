using System;
using System.Net.Http;

namespace Acheronte.APIs
{
  public abstract class BaseApi
  {
    internal HttpClient httpClient;


    internal readonly string BaseUrl = "http://172.28.24.157/";

    public Uri ComposeUrl( params string[] uriComponents)
    {
      string addUriComp = String.Join("/", uriComponents);
      return new Uri(BaseUrl + addUriComp);
    }

    public BaseApi()
    {
      httpClient = new HttpClient();
    }
  }
}
