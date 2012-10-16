using Netchex.DataAccess;
using Netchex.DataAccess.Interfaces;
using Netchex.Domain.WidgetData;
using Netchex.Security;
using Newtonsoft.Json;

namespace Netchex.Framework.DashboardBuilder
{
    public class WidgetBuilder : IWidgetBuilder
    {
        private readonly ICategoryRepository _categoryrepository;
        private readonly IWidgetRepository _widgetrepository;

        public WidgetBuilder(ICategoryRepository categoryrepository, IWidgetRepository widgetrepository)
        {
            _categoryrepository = categoryrepository;
            _widgetrepository = widgetrepository;
        }

        public string BuildCategories()
        {
            var categorylist = _categoryrepository.GetCategoryList();
            var serializedcategorylist = JsonConvert.SerializeObject(categorylist);
            var formattedcategorylist = "{\"categories\": " + serializedcategorylist + "}";
            return formattedcategorylist;
        }

        public string BuildWidgets(SecurityResolver sr)
        {
            var widgets = JsonConvert.SerializeObject(_widgetrepository.BuildCategoryWidgets());
            var formattedwidgets = "{\"result\":{\"data\":" + widgets + "}}";
            return formattedwidgets;
        }

        public IWidgetData GetWidgetData(string widgetType)
        {
            switch (widgetType)
            {
                case "komyprofile":
                    return _widgetrepository.GetProfileData();
                default:
                    return new MyProfileWidget();
            }
        }
    }
}
