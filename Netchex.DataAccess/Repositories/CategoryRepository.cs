using System.Collections.Generic;
using Netchex.Domain.Dashboard;

namespace Netchex.DataAccess.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        public CategoryList GetCategoryList()
        {
            var categories = new List<Category>
                                 {
                                     new Category(1, "My category", 2, "/Widget/GetWidgetList"),
                                     new Category(2, "Another category", 2, "/Widget/GetWidgetList"),
                                     new Category(3, "Iframe widgets", 2, "/Widget/GetWidgetList")
                                 };
            var categorylist = new CategoryList {category = categories};
            return categorylist;
        }
    }
}
