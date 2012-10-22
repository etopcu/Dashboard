namespace $rootnamespace$.Controllers.Home
{
    using System.Web.Mvc;
    
    public partial class HomeController : BaseController
    {
       [AllowAnonymous] 
       public ActionResult Index()
       {
           return View();
       }
    }
}