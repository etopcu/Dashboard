using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Netchex.Domain.Dashboard;

namespace Netchex.DataAccess
{
    public interface ICategoryRepository
    {
        CategoryList GetCategoryList();
    }
}
