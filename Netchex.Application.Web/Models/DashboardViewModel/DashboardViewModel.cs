using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Netchex.Domain.Dashboard;

namespace Netchex.Application.Web.Models
{
    public class DashboardViewModel
    {
        public CategoryList categories;
        public IEnumerable<Widget> widgets;
    }
}