namespace MvcApplication141.Service
{ 
    using Core.Interfaces.Data;
	using Core.Interfaces.Service;
    using Core.Model;

    public partial class WidgetInstanceService : BaseService<WidgetInstance>, IWidgetInstanceService
    {
		protected new IWidgetInstanceRepository Repository;				
		
		public WidgetInstanceService(IUnitOfWork unitOfWork, IWidgetInstanceRepository widgetinstanceRepository)
			:base(unitOfWork)
		{
		    base.Repository = Repository = widgetinstanceRepository;
		}		
	}
}