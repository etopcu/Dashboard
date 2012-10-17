namespace MvcApplication141.Bootstrappers
{
    using System.IO;
    using System.Linq;
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
        public static void Widgets()
        {
            var widgetDirectory = new DirectoryInfo(HttpContext.Current.Server.MapPath("~/Models/Widgets"));

            foreach (var child in widgetDirectory.GetDirectories())
            {
                var manifestFile = child.GetFiles("manifest.xml");
                if (manifestFile.FirstOrDefault() != null)
                {
                    string xmlPath = manifestFile[0].FullName;

                    var serializer = new XmlSerializer(typeof(Manifest));
                    var fs = new FileStream(xmlPath, FileMode.Open);
                    var reader = new XmlTextReader(fs);

                    var manifest = (Manifest)serializer.Deserialize(reader);

                    InstalledWidget installedWidget = new InstalledWidget();
                    installedWidget.InjectFrom<UnflatLoopValueInjection>(manifest);

                    var widgetService = DependencyResolver.Current.GetService<IInstalledWidgetsService>();

                    widgetService.SaveOrUpdate(installedWidget);

                }

            }
        }
    }
}