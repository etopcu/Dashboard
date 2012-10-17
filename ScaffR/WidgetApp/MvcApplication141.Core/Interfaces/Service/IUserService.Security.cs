using MvcApplication141.Core.Model;

namespace MvcApplication141.Core.Interfaces.Service
{
    public partial interface IUserService
    {
        User GetByUsername(string userName);
    }
}