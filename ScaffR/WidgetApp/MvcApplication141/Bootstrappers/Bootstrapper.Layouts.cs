namespace MvcApplication141.Bootstrappers
{
    using System.IO;
    using System.Web.Mvc;
    using System.Xml;
    using System.Xml.Serialization;
    using Core.Interfaces.Service;
    using Core.Model;
    using Models.Schemas;
    using System.Web;
    using Omu.ValueInjecter;

    public partial class Bootstrapper
    {
        public static void Layouts()
        {
            var layoutDir = new DirectoryInfo(HttpContext.Current.Server.MapPath("~/Models/Layouts"));
            var layoutFiles = layoutDir.GetFiles("manifest.xml", SearchOption.AllDirectories);
            foreach(var layoutFile in layoutFiles)
            {
                string xmlPath = layoutFile.FullName;

                var serializer = new XmlSerializer(typeof(Layout));
                var fs = new FileStream(xmlPath, FileMode.Open);
                var reader = new XmlTextReader(fs);

                var layout = (Layout)serializer.Deserialize(reader);

                var installedLayout = new InstalledLayout
                                          {                                              
                                              HtmlValue = layout.HtmlValue
                                          };


                var widgetService = DependencyResolver.Current.GetService<IInstalledLayoutService>();

                widgetService.SaveOrUpdate(installedLayout);
            }
        }
    }
}