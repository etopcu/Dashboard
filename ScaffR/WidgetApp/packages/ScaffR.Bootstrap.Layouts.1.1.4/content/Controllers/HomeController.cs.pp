namespace $rootnamespace$.Controllers
{
    using System.Web.Mvc;
    using MvcSiteMapProvider;
    
    public partial class HomeController : BaseController
    {
       [MvcSiteMapNode(Title = "Home")]  
       public ActionResult Index()
       {
           return View();
       }
    }
}