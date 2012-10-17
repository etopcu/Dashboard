namespace MvcApplication141.Data
{ 
	using Core.Interfaces.Data;
	using Core.Model;

	public partial class UserRepository : BaseRepository<User>, IUserRepository
    {
		public UserRepository(IDatabaseFactory databaseFactory)
	        : base(databaseFactory)
	    {
	    }
	}
}