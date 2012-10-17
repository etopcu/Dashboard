namespace MvcApplication141.Data
{ 
	using Core.Interfaces.Data;
	using Core.Model;

	public partial class DashboardRepository : BaseRepository<Dashboard>, IDashboardRepository
    {
		public DashboardRepository(IDatabaseFactory databaseFactory)
	        : base(databaseFactory)
	    {
	    }
	}
}