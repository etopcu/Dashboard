namespace MvcApplication141.Service
{
    using System.Linq;
    using Core.Interfaces.Data;
	using Core.Interfaces.Service;
    using Core.Model;

    public partial class InstalledWidgetsService : BaseService<InstalledWidget>, IInstalledWidgetsService
    {
		protected new IInstalledWidgetsRepository Repository;				
		
		public InstalledWidgetsService(IUnitOfWork unitOfWork, IInstalledWidgetsRepository installedwidgetsRepository)
			:base(unitOfWork)
		{
		    base.Repository = Repository = installedwidgetsRepository;
		}

        public IQueryable<InstalledWidget> GetWidgetsByCategory(int categoryId)
        {
            throw new System.NotImplementedException();
        }
    }
}