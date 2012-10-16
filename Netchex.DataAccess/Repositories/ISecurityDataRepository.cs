using System.Collections.Generic;
using Netchex.Domain.Objects;
using Netchex.Domain.Person;

namespace Netchex.DataAccess.Repositories
{
    public interface ISecurityDataRepository
    {
        Roles getRoles(User secureuser);
        List<Permission> getPermissions(User secureuser);
    }
}
