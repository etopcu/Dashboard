using Netchex.Domain.Dashboard;
using System.Web.Mvc;
using Netchex.DataAccess.Interfaces;
using Netchex.Framework.DashboardBuilder;
using Netchex.Domain.Objects;
using Netchex.Security;
using Netchex.Domain.Person;


namespace Netchex.Application.Web.Controllers
{
    public class WidgetController : Controller
    {
        private readonly SecurityResolver _sr;
        private readonly SessionData _sd;
        private readonly IWidgetBuilder _widgetbuilder;
        private readonly IWidgetRepository _widgetrepository;

        public WidgetController(IWidgetBuilder widgetbuilder, IWidgetRepository widgetrepository, 
            SecurityResolver sr, SessionData sd)
        {
            _widgetbuilder = widgetbuilder;
            _widgetrepository = widgetrepository;
            _sr = sr;
            _sd = sd;
        }

        public JsonResult GetCategories()
        {
            var categories = _widgetbuilder.BuildCategories();
            return Json(categories, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetWidgetList()
        {
            var loggedinUser = new User { Id = _sd.NetworkUserID, IsEss = _sd.IsEss.Equals("Yes") };
            _sr.Setup(loggedinUser);

            var widgets = _widgetbuilder.BuildWidgets(_sr);
            
            return Json(widgets, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public void UpdateParameters(Widget widget)
        {
            _widgetrepository.UpdateParameters(widget);
        }

        public JsonResult GetData(string widgettype)
        {
            var widget = _widgetbuilder.GetWidgetData(widgettype);
            return Json(widget, JsonRequestBehavior.AllowGet);
        }
    }
}
