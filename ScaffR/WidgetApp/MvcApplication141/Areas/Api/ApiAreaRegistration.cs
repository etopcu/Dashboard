using System.Web.Mvc;

namespace MvcApplication141.Areas.Api
{
    using System.Web.Http;

    public class ApiAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "Api";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            Bootstrappers.Bootstrapper.WebApi(GlobalConfiguration.Configuration);
        }
    }
}