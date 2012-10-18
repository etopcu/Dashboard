namespace MvcApplication141.Data
{ 
	using Core.Interfaces.Data;
	using Core.Model;

	public partial class AvailableWidgetsRepository : BaseRepository<AvailableWidget>, IAvailableWidgetsRepository
    {
		public AvailableWidgetsRepository(IDatabaseFactory databaseFactory)
	        : base(databaseFactory)
	    {
	    }
	}
}