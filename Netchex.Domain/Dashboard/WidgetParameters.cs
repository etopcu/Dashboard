using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Netchex.Domain.Dashboard
{
    public class WidgetParameter
    {
        public int ParameterID;
        public string ParameterName;
        public string ParameterValue;

        public WidgetParameter(int id, string name, string value)
        {
            ParameterID = id;
            ParameterName = name;
            ParameterValue = value;
        }
    }
}
