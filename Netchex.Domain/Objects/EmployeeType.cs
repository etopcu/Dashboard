using Netchex.Domain.Commons;

namespace Netchex.Domain.Objects
{
    public class EmployeeType
    {
        public string EmployeeType_Txt { get; set; }
        private bool _isAdmin;
        private bool _isManager;
        private bool _isEmployee;
        private string _employeetype;

        public void Initialize()
        {

            if (EmployeeType_Txt.In(new[] { "NetchexUser", "Admin" }))
            {
                _isAdmin = true;
            }
            else if (EmployeeType_Txt.Left(7).ToLower().Equals("manager"))
            {
                _employeetype = "Manager";
                _isManager = true;
            }
            else
            {
                _employeetype = "Employee";
                _isEmployee = true;
            }
        }

        public bool IsAdmin
        {
            get { return _isAdmin; }
            set { _isAdmin = value; }
        }

        public bool IsManager
        {
            get { return _isManager; }
            set { _isManager = value; }
        }

        public bool IsEmployee
        {
            get { return _isEmployee; }
            set { _isEmployee = value; }
        }

        public new string ToString()
        {
            return _employeetype;
        }
    }
}