using Netchex.Domain.WidgetData;
using Netchex.Security;

namespace Netchex.Framework.DashboardBuilder
{
    public interface IWidgetBuilder
    {
        string BuildCategories();
        string BuildWidgets(SecurityResolver sr );
        IWidgetData GetWidgetData(string widgetType);
    }
}
