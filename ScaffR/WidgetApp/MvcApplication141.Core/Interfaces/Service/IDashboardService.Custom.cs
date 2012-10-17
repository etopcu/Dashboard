namespace MvcApplication141.Core.Interfaces.Service
{ 	
	using MvcApplication141.Core.Model;

    public partial interface IDashboardService
    {
        Dashboard GetDashboardForUser(int userId);
    }
}