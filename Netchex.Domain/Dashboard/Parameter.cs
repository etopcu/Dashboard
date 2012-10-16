using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Netchex.Domain.Dashboard
{
    public class Parameter
    {
        public int id { get; set; }
        public string name { get; set; }
        public string value { get; set; }

        public Parameter() { }

        public Parameter(int _id, string _name, string _value)
        {
            id = _id;
            name = _name;
            value = _value;
        }
    }
}
