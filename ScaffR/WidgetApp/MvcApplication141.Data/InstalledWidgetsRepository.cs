namespace MvcApplication141.Data
{ 
	using Core.Interfaces.Data;
	using Core.Model;

	public partial class InstalledWidgetsRepository : BaseRepository<InstalledWidget>, IInstalledWidgetsRepository
    {
		public InstalledWidgetsRepository(IDatabaseFactory databaseFactory)
	        : base(databaseFactory)
	    {
	    }
	}
}