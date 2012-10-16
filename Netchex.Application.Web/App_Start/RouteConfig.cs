using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace Netchex
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{employeeId}",
                defaults: new { controller = "Home", action = "Index", employeeId = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "EmpMenu",
                url: "EmpMenu/EmployeeMenuLegacy/{employeeId}",
                defaults: new { controller = "EmpMenu", action = "EmployeeMenuLegacy", employeeId = UrlParameter.Optional }
            );

        }
    }
}