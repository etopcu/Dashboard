namespace MvcApplication141.Service
{
    using System.Linq;
    using Core.Model;

    public partial class DashboardService
    {
        public Dashboard GetDashboardForUser(int userId)
        {
            Dashboard dashboard = this.Find(x=>x.UserId == userId).FirstOrDefault();
            if (dashboard != null)
            {
                dashboard = this.Find(x => x.IsDefault).FirstOrDefault();
            }

            return dashboard;
        }
    }
}