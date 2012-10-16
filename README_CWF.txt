Some Packages you may need\want to install. You can also reference the packages folder for the dll.


PM> Install-Package WebGrease

PM> Install-Package Microsoft.Web.Optimization -Version 1.0.0-beta -Pre

PM> Install-Package System.Web.Providers

PM> Install-Package Newtonsoft.Json 

PM> Install-Package EntityFramework -Version 4.3.1

PM> Install-Package Microsoft.AspNet.Web.Optimization -Pre 

PM> Install-Package Dapper

PM> Install-Package ninject.mvc3

You might notice that after installing the ninject.mvc3 NuGet there is an App_Start subfolder created inside your project containing an NinjectMVC3.cs file. Delete this folder and try again. So here are the steps I followed:
 1.Create a new ASP.NET MVC 3 project using the default template
 2.Bring up the Package Manager Console window (View -> Other Windows -> Package Manager Console)
 3.Type install-package ninject.mvc3 on the command line
 4.Replace the default code in Global.asax with the code in your question
 5.Delete the AppStart subfolder created during the installation of the package
 6.Run the application
 7.Enjoy the beauty of the /Home/Index default page opened in your Google Chrome web browser :-)



LOOK in DATA folder in root to install database scripts.
README included in DATA directory.


