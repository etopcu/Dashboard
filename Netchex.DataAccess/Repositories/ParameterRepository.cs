using System;
using System.Collections.Generic;
using Netchex.DataAccess.Interfaces;
using Netchex.Domain.Dashboard;

namespace Netchex.DataAccess.Repositories
{
    public class ParameterRepository : IParameterRepository
    {
        public IEnumerable<Parameter> GetParameters(int id)
        {
            var list = new List<Parameter>
                           {
                               new Parameter(1, "range", "20"),
                               new Parameter(2, "Active", "true"),
                               new Parameter(3, "Editable", "false")
                           };

            return list;
        }

        public void SetParameters(Widget widget)
        {
            throw new NotImplementedException();
        }
    }
}
