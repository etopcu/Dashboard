namespace MvcApplication141.Service
{
    using System.Linq;
    using Core.Interfaces.Data;
	using Core.Interfaces.Service;
    using Core.Model;

    public partial class AvailableWidgetsService : BaseService<AvailableWidget>, IAvailableWidgetsService
    {
		protected new IAvailableWidgetsRepository Repository;				
		
		public AvailableWidgetsService(IUnitOfWork unitOfWork, IAvailableWidgetsRepository availablewidgetsRepository)
			:base(unitOfWork)
		{
		    base.Repository = Repository = availablewidgetsRepository;
		}

        public IQueryable<AvailableWidget> GetWidgetsByCategory(int categoryId)
        {
            throw new System.NotImplementedException();
        }
    }
}