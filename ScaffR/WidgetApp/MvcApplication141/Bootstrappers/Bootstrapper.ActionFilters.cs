[assembly: WebActivator.PreApplicationStartMethod(typeof(MvcApplication141.Bootstrappers.Bootstrapper), "ActionFilters")]

namespace MvcApplication141.Bootstrappers
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