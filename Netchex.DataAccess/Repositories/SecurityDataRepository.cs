using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Netchex.Domain.Objects;
using Netchex.Domain.Person;

namespace Netchex.DataAccess.Repositories
{
    public class SecurityDataRepository : ISecurityDataRepository
    {
        private readonly IDbConnection _connection;

        public SecurityDataRepository()
        {
        }

        public Roles getRoles(User secureuser)
        {
            var userRoles = new Roles();
            string strQuery = "SELECT dbo.udf_GetEmployeeType(@cUser_Cd) AS EmployeeType_Txt ";
            var employeeType = (_connection.Query<EmployeeType>(strQuery, new { cUser_Cd = secureuser.Id }).SingleOrDefault());
            if(employeeType == null)
                throw new Exception("Something Bad Happened");
            employeeType.Initialize();
            
            if (employeeType.IsAdmin)
            {
                userRoles = userRoles | Roles.Admin;
            }
            else if (employeeType.IsManager)
            {
                strQuery = "select Access_Cd from Security..UserSettings where User_Cd = @cUser_Cd";
                var managerType = (_connection.Query<string>(strQuery, new { cUser_Cd = secureuser.Id }).SingleOrDefault());
                if(managerType == null)
                    throw new Exception("Something Bad Happened");
                managerType = managerType.Trim();
                if(managerType.Equals("D"))
                    userRoles = userRoles | Roles.ManagerDepartment;
                else
                    userRoles = userRoles | Roles.ManagerEmployee;
            }
            else
            {
                userRoles = userRoles | Roles.Ess;
            }
            return userRoles;
        }

        public List<Permission> getPermissions(User secureuser)
        {
            var displaySecurity = new DisplaySecurity();
            var modifySecurity = new ModifySecurity();
            const string strQuery = "SELECT dbo.udf_GetEmployeeType(@cUser_Cd) AS EmployeeType_Txt ";
            var employeeType = (_connection.Query<EmployeeType>(strQuery, new { cUser_Cd = secureuser.Id }).SingleOrDefault());
            if (employeeType == null)
                throw new Exception("Something Bad Happened");
            employeeType.Initialize();
                   
            return new PermissionList(displaySecurity, modifySecurity);
        }
    }

}
