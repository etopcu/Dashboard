using System.Linq;
using MvcApplication141.Core.Model;
using System;

namespace MvcApplication141.Service
{
    public partial class UserService
    {
        public User GetByUsername(string userName)
        {
            return Find(u => u.Username.Equals(userName, StringComparison.InvariantCultureIgnoreCase)).FirstOrDefault();
        }
    }
}