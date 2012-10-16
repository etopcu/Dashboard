using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Netchex.Domain.Dashboard;
using Netchex.Domain.Objects;
using Netchex.Domain.Person;

namespace Netchex.DataAccess
{
    public interface IDashboardRepository
    {
        string GetDashboardType(User user, Roles role);
        Dashboard GetCompanyDashboard(User user);
        Dashboard GetUserDashboard(User user, Roles role);
        Dashboard CreateCompanyDashboard(Dashboard dashboard);
        Dashboard CreateUserDashboard(Dashboard dashboard);
        void UpdateDashboard(Dashboard dashboard);
    }
}
