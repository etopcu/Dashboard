using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Netchex.Domain.Dashboard;

namespace Netchex.DataAccess.Interfaces
{
    public interface IParameterRepository
    {
        IEnumerable<Parameter> GetParameters(int id);
        void SetParameters(Widget widget);
    }
}
