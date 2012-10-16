using System.Collections.Generic;
using System.Linq;
using Netchex.DataAccess.Interfaces;
using Netchex.Domain.Dashboard;
using Netchex.Domain.Objects;
using Netchex.Domain.WidgetData;

namespace Netchex.DataAccess.Repositories
{
    public class WidgetRepository : IWidgetRepository
    {
        private readonly IParameterRepository _parameterrepository;

        public WidgetRepository(IParameterRepository parameterrepository)
        {
            _parameterrepository = parameterrepository;
        }

        public IEnumerable<Widget> GetDashboardWidgets(Dashboard dashboard)
        {
            if (dashboard.id == 1)
            {
                var list = new List<Widget>
                               {
                                   new Widget(1, "Widget One", "/Dashboard/widgets/widget1.html",
                                              "/Dashboard/widgets/editwidget1.html", "first", true),
                                   new Widget(2, "Widget Regular", "/Dashboard/widgets/MyProfile.html",
                                              "/Dashboard/widgets/editwidget2.html", "first", true),
                                    new Widget(3, "Widget test", "/Dashboard/widgets/KO_MyProfile.html",
                                              "/Dashboard/widgets/editwidget2.html", "first", true)
                               };

                foreach (var x in list)
                {
                    x.metadata = _parameterrepository.GetParameters(x.id);
                }
                return list;
            }
            else
            {
                var list = new List<Widget>
                               {
                                   new Widget(1, "Widget One", "/Dashboard/widgets/widget1.html",
                                              "/Dashboard/widgets/editwidget1.html", "first", true),
                                   new Widget(2, "Widget Regular", "/Dashboard/widgets/MyProfile.html",
                                              "/Dashboard/widgets/editwidget2.html", "first", true),
                                    new Widget(3, "Widget test", "/Dashboard/widgets/KO_MyProfile.html",
                                              "/Dashboard/widgets/editwidget2.html", "first", true)
                               };

                foreach (var x in list)
                {
                    x.metadata = _parameterrepository.GetParameters(x.id);
                }
                return list;
            }
        }

        public IEnumerable<Widget> BuildCategoryWidgets()
        {
            var list = new List<Widget>
                           {
                               new Widget(1, "Cat 1 widget1", "/Dashboard/widgets/widget1.html",
                                          "/Dashboard/widgets/widget1.png"),
                               new Widget(2, "Cat 1 widget2", "/Dashboard/widgets/widget2.html",
                                          "/Dashboard/widgets/widget2.png")
                           };

            foreach (var x in list)
            {
                x.metadata = _parameterrepository.GetParameters(x.id);
            }
            return list;
        }

        public void UpdateWidgets(IEnumerable<Widget> widgetlist)
        {
            foreach (var id in widgetlist.Select(x => x.id))
            {
            }
        }

        public void UpdateParameters(Widget widget)
        {

        }

        public IWidgetData GetProfileData()
        {
            var profileData = new MyProfileWidget();
            return profileData;
        }
    }
}
