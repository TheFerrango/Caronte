using System;
using System.Net.Http;

namespace Acheronte.APIs
{
  public abstract class BaseApi
  {
    internal HttpClient httpClient;


    //internal readonly string BaseUrl = "http://172.28.24.157/";
    internal readonly string BaseUrl = "http://192.168.2.114/";
    //internal readonly string BaseUrl = "http://localhost:52274/";
    
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
