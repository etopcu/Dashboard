[assembly: WebActivator.PreApplicationStartMethod(typeof(NetchexAngular.Bootstrappers.Bootstrapper), "ActionFilters")]

namespace NetchexAngular.Bootstrappers
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