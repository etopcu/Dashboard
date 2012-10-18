using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MvcApplication141.Core.Model
{
    public class AvailableWidget : DomainObject
    {
        public int WidgetId { get; set; }
        public string Name { get; set; }
        public string Template { get; set; }
    }
}
