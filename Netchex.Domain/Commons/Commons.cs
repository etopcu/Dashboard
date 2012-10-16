using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;

namespace Netchex.Domain.Commons
{    
    public enum NameStyle { FirstLast, LastFirst };   
    

    public class UploadPath
    {
        public const string EmployeeImage = "~/Uploads/Employee/Image/";
        public const string EmployeeImageTemp = "~/Uploads/Employee/Temp/";
    }

    public class Dates
    {
        public static String ISO_Date()
        {
            var utcNow = TimeProvider.Current.UtcNow;
            return utcNow.ToString("yyyy_MM_dd_HH_mm_ss");
        }
    }
}
