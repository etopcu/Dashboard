namespace MvcApplication141.Application
{
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using System.Xml;
    using System.Xml.Serialization;
    using Core.Interfaces.Service;
    using Core.Model;
    using Models.Schemas;
    using Omu.ValueInjecter;

    public partial class MvcApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            Bootstrappers.Bootstrapper.Widgets();
            Bootstrappers.Bootstrapper.Layouts();
            Bootstrappers.Bootstrapper.Routes();
        }

        private void IndexWidgetData()
        {
        }
    }
}