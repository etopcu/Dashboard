namespace MvcApplication141.Data
{ 
	using Core.Interfaces.Data;
	using Core.Model;

	public partial class WidgetInstanceRepository : BaseRepository<WidgetInstance>, IWidgetInstanceRepository
    {
		public WidgetInstanceRepository(IDatabaseFactory databaseFactory)
	        : base(databaseFactory)
	    {
	    }
	}
}