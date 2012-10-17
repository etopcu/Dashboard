namespace MvcApplication141.Data
{ 
	using Core.Interfaces.Data;
	using Core.Model;

	public partial class InstalledLayoutRepository : BaseRepository<InstalledLayout>, IInstalledLayoutRepository
    {
		public InstalledLayoutRepository(IDatabaseFactory databaseFactory)
	        : base(databaseFactory)
	    {
	    }
	}
}