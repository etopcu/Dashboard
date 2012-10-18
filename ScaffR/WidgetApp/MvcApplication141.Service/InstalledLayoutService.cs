namespace MvcApplication141.Service
{ 
    using Core.Interfaces.Data;
	using Core.Interfaces.Service;
    using Core.Model;

    public partial class AvailableLayoutService : BaseService<AvailableLayout>, IAvailableLayoutService
    {
		protected new IAvailableLayoutRepository Repository;				
		
		public AvailableLayoutService(IUnitOfWork unitOfWork, IAvailableLayoutRepository availablelayoutRepository)
			:base(unitOfWork)
		{
		    base.Repository = Repository = availablelayoutRepository;
		}		
	}
}