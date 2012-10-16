using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Netchex.Domain.Dashboard
{
    interface IWidget
    {
        int ID { get; }
        int Type { get; }
        string Name { get; }
    }
}
