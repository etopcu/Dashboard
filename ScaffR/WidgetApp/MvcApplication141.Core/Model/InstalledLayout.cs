using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MvcApplication141.Core.Model
{
    public class InstalledLayout : DomainObject
    {
        public string Thumbnail { get; set; }
        public int Order { get; set; }
        public string HtmlValue { get; set; }
    }
}
