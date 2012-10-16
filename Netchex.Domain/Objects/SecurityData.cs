using System;

namespace Netchex.Domain.Objects
{
    [Flags]
    public enum Roles
    {
        Admin = 1, 
        ManagerDepartment = 2, 
        ManagerEmployee = 4,
        Ess = 8 
    }    
}
