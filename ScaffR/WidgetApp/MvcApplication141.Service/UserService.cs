namespace MvcApplication141.Service
{ 
    using Core.Interfaces.Data;
	using Core.Interfaces.Service;
    using Core.Model;

    public partial class UserService : BaseService<User>, IUserService
    {
		protected new IUserRepository Repository;				
		
		public UserService(IUnitOfWork unitOfWork, IUserRepository userRepository)
			:base(unitOfWork)
		{
		    base.Repository = Repository = userRepository;
		}		
	}
}