using System.Collections.Generic;
using System.Linq;
using Netchex.Domain.Dashboard;
using Netchex.Domain.Objects;
using Netchex.Domain.WidgetData;

namespace Netchex.DataAccess.Interfaces
{
    public interface IWidgetRepository
    {
        IEnumerable<Widget> GetDashboardWidgets(Dashboard dashboard);
        IEnumerable<Widget> BuildCategoryWidgets();
        void UpdateWidgets(IEnumerable<Widget> widgetlist);
        void UpdateParameters(Widget widget);
        IWidgetData GetProfileData();
    }
}
