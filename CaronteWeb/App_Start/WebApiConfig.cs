﻿using System.Web.Http;

namespace CaronteWeb
{
  public static class WebApiConfig
  {
    public static void Register(HttpConfiguration config)
    {
      // Web API configuration and services

      // Web API routes
      config.MapHttpAttributeRoutes();

      config.Routes.MapHttpRoute(
        name: "ActionApi",
        routeTemplate: "api/{controller}/{action}/{id}",
        defaults: new
        {

        }
      );

      config.Routes.MapHttpRoute(
          name: "DefaultApi",
          routeTemplate: "api/{controller}/{id}",
          defaults: new
          {
            id = RouteParameter.Optional,
          }
      );
    }
  }
}
