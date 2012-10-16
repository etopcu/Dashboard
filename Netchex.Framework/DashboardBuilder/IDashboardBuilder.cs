using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Netchex.Domain.Dashboard;
using Netchex.Security;

namespace Netchex.Framework.DashboardBuilder
{
    public interface IDashboardBuilder
    {
        Dashboard BuildDashboard(SecurityResolver sr);
        Dashboard CreateCustomDashboard(Dashboard dashboard);
    }
}
