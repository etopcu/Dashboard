using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Netchex.Domain.WidgetData
{
    class MyPayWidget
    {
        public string CheckNumber { get; set; }
        public string Date { get; set; }
        public string CheckType { get; set; }
        public int CheckAmount { get; set; }
        public int AmountYTD { get; set; }

    }
}
