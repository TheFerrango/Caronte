using System;

namespace Acheronte.Models
{
  public class AccessToken
  {
    public string access_token { get; set; }
    public string token_tipe { get; set; }
    public UInt64 expires_in { get; set; }
  }
}
