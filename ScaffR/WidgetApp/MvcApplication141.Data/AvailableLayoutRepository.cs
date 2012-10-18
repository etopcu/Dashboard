namespace MvcApplication141.Data
{ 
	using Core.Interfaces.Data;
	using Core.Model;

	public partial class AvailableLayoutRepository : BaseRepository<AvailableLayout>, IAvailableLayoutRepository
    {
		public AvailableLayoutRepository(IDatabaseFactory databaseFactory)
	        : base(databaseFactory)
	    {
	    }
	}
}