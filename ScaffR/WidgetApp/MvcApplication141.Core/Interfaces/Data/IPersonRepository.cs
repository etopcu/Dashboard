namespace MvcApplication141.Core.Interfaces.Data
{ 
	using MvcApplication141.Core.Model;

    public partial interface IPersonRepository : IRepository<Person>
    {		
		// Add extra datainterface methods in a partial interface
	}
}
