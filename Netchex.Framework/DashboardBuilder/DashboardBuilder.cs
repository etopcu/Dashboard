using Netchex.Security;
using Netchex.DataAccess.Interfaces;
using Netchex.Domain.Dashboard;
using Netchex.DataAccess;

namespace Netchex.Framework.DashboardBuilder
{
    public class DashboardBuilder : IDashboardBuilder
    {
        private readonly IDashboardRepository _dashboardrepository;
        private readonly IWidgetRepository _widgetrepository;
        private readonly IParameterRepository _parameterrepository;

        private void InitDashboard(Dashboard dashboard)
        {
            dashboard.data = _widgetrepository.GetDashboardWidgets(dashboard);

            foreach (Widget x in dashboard.data)
            {
                x.metadata = _parameterrepository.GetParameters(x.id);
            }
        }

        public DashboardBuilder(IDashboardRepository dashboardrepository, IWidgetRepository widgetrepository,
            IParameterRepository parameterrepository)
        {
            _dashboardrepository = dashboardrepository;
            _widgetrepository = widgetrepository;
            _parameterrepository = parameterrepository;
        }

        public Dashboard BuildDashboard(SecurityResolver sr)
        {
            var dashboardtype = _dashboardrepository.GetDashboardType(sr.user, sr.CurrentRole);
            var dashboard = dashboardtype == "Company" ? _dashboardrepository.GetCompanyDashboard(sr.user) : 
                _dashboardrepository.GetUserDashboard(sr.user, sr.CurrentRole);
            InitDashboard(dashboard);
            return dashboard;
        }

        public Dashboard CreateCustomDashboard(Dashboard dashboard)
        {
            if (dashboard.type == "Company")
                return _dashboardrepository.CreateUserDashboard(dashboard);
            return _dashboardrepository.CreateCompanyDashboard(dashboard);
        }
    }
}
