namespace MvcApplication141.Service
{ 
    using Core.Interfaces.Data;
	using Core.Interfaces.Service;
    using Core.Model;

    public partial class InstalledLayoutService : BaseService<InstalledLayout>, IInstalledLayoutService
    {
		protected new IInstalledLayoutRepository Repository;				
		
		public InstalledLayoutService(IUnitOfWork unitOfWork, IInstalledLayoutRepository installedlayoutRepository)
			:base(unitOfWork)
		{
		    base.Repository = Repository = installedlayoutRepository;
		}		
	}
}