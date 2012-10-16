using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Netchex.Domain.Dashboard
{
    public class Dashboard
    {
        public int id { get; set; }
        public string layout { get; set; }
        public IEnumerable<Widget> data { get; set; }
        public string type { get; set; }

        public Dashboard() { }

        public Dashboard(int _id, string _layout, string _type)
        {
            id = _id;
            layout = _layout;
            type = _type;
        }
    }
}
