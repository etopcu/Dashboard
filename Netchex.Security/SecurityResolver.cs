using System.Collections.Generic;
using System.Linq;
using Netchex.DataAccess.Repositories;
using Netchex.Domain.Objects;
using Netchex.Domain.Person;

namespace Netchex.Security
{
    public class SecurityResolver
    {
        private Roles _assignedRoles;
        private Roles _currentRole;        
        private List<Permission> _permissionList;
        public User user = new User();
        private ISecurityDataRepository _rolesRepository;

        public SecurityResolver(ISecurityDataRepository rolesRepository)
        {
            _rolesRepository = rolesRepository;
        }

        public bool AuthorizeRole(Roles requiredRoles)
        {
            return (requiredRoles & _assignedRoles) == requiredRoles;
        }

        public IQueryable<Permission> GetPermissions()
        {
            return _permissionList.AsQueryable();
        }

        public bool IsEssMode { get { return user.IsEss; } }

        public void Setup(User loggedinUser)
        {
            user = loggedinUser;
            //GetCurrentRole();
        }

        private void GetCurrentRole()
        {
            if (AuthorizeRole(Roles.Admin))
                _currentRole = Roles.Admin;
            else if (AuthorizeRole(Roles.ManagerDepartment))
                _currentRole = Roles.ManagerDepartment;
            else if (AuthorizeRole(Roles.ManagerEmployee))
                _currentRole = Roles.ManagerEmployee;
            else
                _currentRole = Roles.Ess;
        }

        public Roles CurrentRole { get { return _currentRole; } }
    }
}
