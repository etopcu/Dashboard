using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Netchex.Domain.Objects
{
    public class Permission
    {
        //public int ID { get; set; }
        public string Name { get; set; }
    }


    public class PermissionList : List<Permission>
    {
        public PermissionList(DisplaySecurity DisplaySecurity, ModifySecurity ModifySecurity)
        {
            foreach (var prop in DisplaySecurity.GetType().GetProperties())
            {
                if ((Boolean)prop.GetValue(DisplaySecurity, null))
                    this.Add(new Permission() { Name = prop.Name.Replace("_Ind", "") });
            }
        }
    }

}
