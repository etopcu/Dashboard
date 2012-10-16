using System.Web.Mvc;
using Netchex.DataAccess;
using Netchex.Domain.Dashboard;
using Netchex.Domain.Objects;
using Netchex.Domain.Person;
using Netchex.Framework.DashboardBuilder;
using Netchex.Security;

namespace Netchex.Application.Web.Controllers
{
    public class DashboardController : Controller
    {
        private readonly IDashboardBuilder _dashboardbuilder;
        private readonly IDashboardRepository _dashboardrepository;
        private readonly SecurityResolver _sr;
        private readonly SessionData _sd;

        public DashboardController(IDashboardBuilder dashboardbuilder, IDashboardRepository dashboardrepository,
            SecurityResolver sr, SessionData sd)
        {
            _sr = sr;
            _sd = sd;
            _dashboardbuilder = dashboardbuilder;
            _dashboardrepository = dashboardrepository;
        }
        //
        // GET: /Dashboard/
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetDashboard()
        {
            var loggedinUser = new User { Id = _sd.NetworkUserID, IsEss = _sd.IsEss.Equals("Yes") };
            _sr.Setup(loggedinUser);
            
            var dashboard = _dashboardbuilder.BuildDashboard(_sr);

            return Json(dashboard, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public void UpdateDashboard(Dashboard dashboard)
        {
            _dashboardrepository.UpdateDashboard(dashboard);
        }

        [HttpPost]
        public JsonResult CreateDashboard(Dashboard dashboard)
        {
            var createddashboard = _dashboardbuilder.CreateCustomDashboard(dashboard);

            return Json(createddashboard, JsonRequestBehavior.AllowGet);
        }


        public ActionResult GetWidget(string widgetId)
        {
            return PartialView(widgetId);
        }

    }
}
