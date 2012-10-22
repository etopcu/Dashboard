[assembly: WebActivator.PreApplicationStartMethod(typeof($rootnamespace$.Bootstrappers.Bootstrapper), "ActionFilters")]

namespace $rootnamespace$.Bootstrappers
{
    using System.Web.Mvc;

    public partial class Bootstrapper
    {
        public static void ActionFilters()
        {
            GlobalFilters.Filters.Add(new HandleErrorAttribute());
        }
    }
}