using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Netchex.Domain.Dashboard
{
    public class Category
    {
        public int id;
        public string title;
        public int amount;
        public string url;

        public Category(int _id, string _title, int _amount, string _url)
        {
            id = _id;
            title = _title;
            amount = _amount;
            url = _url;
        }
    }
}
