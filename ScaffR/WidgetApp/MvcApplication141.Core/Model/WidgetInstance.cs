namespace MvcApplication141.Core.Model
{
    using System.Xml;

    public class WidgetInstance : DomainObject
    {
        public int WidgetId { get; set; }
        public int UserId { get; set; }
        public string WidgetData { get; set; }
        public Location Location { get; set; }
    }
}
