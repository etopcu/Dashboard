namespace MvcApplication141.Service
{ 
    using Core.Interfaces.Data;
	using Core.Interfaces.Service;
    using Core.Model;

    public partial class DashboardService : BaseService<Dashboard>, IDashboardService
    {
		protected new IDashboardRepository Repository;				
		
		public DashboardService(IUnitOfWork unitOfWork, IDashboardRepository dashboardRepository)
			:base(unitOfWork)
		{
		    base.Repository = Repository = dashboardRepository;
		}		
	}
}