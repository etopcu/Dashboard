using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Netchex.Domain.Dashboard;

namespace Netchex.Application.Web.Models.DashboardViewModels
{
    public class DashboardViewModel
    {
        public Dashboard currentDashboard;
        public CategoryList widgetCategories;
    }
}