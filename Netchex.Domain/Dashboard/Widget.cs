using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Netchex.Domain.Dashboard
{
    public class Widget
    {
        public int id { get; set; }
        public string title { get; set; }
        public string column { get; set; }
        public string url { get; set; }
        public string editurl { get; set; }
        public string image { get; set; }
        public bool open { get; set; }
        public IEnumerable<Parameter> metadata { get; set; }

        public Widget() { }

        public Widget(int _id, string _title, string _url, string _image)
        {
            id = _id;
            title = _title;
            url = _url;
            image = _image;
        }

        public Widget(int _id, string _title, string _url, string _editurl, string _column, bool _open)
        {
            id = _id;
            title = _title;
            url = _url;
            editurl = _editurl;
            column = _column;
            open = _open;
        }
    }
}
