using System.Web.Mvc;

namespace MvcApplication141.Controllers
{
    using Core.Interfaces.Service;
    using MvcSiteMapProvider;

    public class HomeController : Controller
    {
        private IDashboardService _dashboardService;

        public HomeController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        //
        // GET: /Home/
        [MvcSiteMapNode(Title = "Home")]
        public ActionResult Index()
        {
            return View();
        }

    }
}
