namespace MvcApplication141.Core.Model
{
    public class Dashboard : DomainObject
    {
        public string Layout { get; set; }
        public int UserId { get; set; }
        public bool IsDefault { get; set; }
    }
}