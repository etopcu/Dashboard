using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Netchex.DataAccess.Interfaces;
using Netchex.Domain.Dashboard;
using Netchex.Domain.Objects;
using Netchex.Domain.Person;

namespace Netchex.DataAccess.Repositories
{
    public class DashboardRepository : IDashboardRepository
    {
        private IWidgetRepository _widgetrepository;

        public DashboardRepository(IWidgetRepository widgetrepository)
        {
            _widgetrepository = widgetrepository;
        }

        /// <summary>
        /// Decides if the user has a custom dashboard, or they are using default.
        /// </summary>
        /// <param name="user"></param>
        /// <param name="role"></param>
        /// <returns>Company or User</returns>
        public string GetDashboardType(User user, Roles role)
        {
            if (role == (Roles)1)
            {
                return "Company";
            }
            else
            {
                return "User";
            }
        }

        public Dashboard GetCompanyDashboard(User user)
        {
            return new Dashboard(1, "layout1", "Company");
        }

        public Dashboard GetUserDashboard(User user, Roles role)
        {
            return new Dashboard(2, "layout4", "User"); ;
        }

        public Dashboard CreateCompanyDashboard(Dashboard dashboard)
        {
            var companydashboard = new Dashboard(1, "layout1", "Company");
            companydashboard.data = (IEnumerable<Widget>)new List<Widget>();
            return companydashboard;
        }

        /// <summary>
        /// Create a new User Dashboard that can be customized
        /// </summary>
        /// <param name="dashboard">Holds the information for the Company Dashboard</param>
        /// <returns>The new User Dashboard</returns>
        public Dashboard CreateUserDashboard(Dashboard dashboard)
        {
            var userdashboard = new Dashboard(dashboard.id, dashboard.layout, "User");
            userdashboard.data = dashboard.data;
            return userdashboard;
        }

        public void UpdateDashboard(Dashboard dashboard)
        {
            _widgetrepository.UpdateWidgets(dashboard.data);
        }
    }
}
