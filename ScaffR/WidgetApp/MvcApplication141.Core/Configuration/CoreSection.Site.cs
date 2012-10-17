namespace MvcApplication141.Core.Configuration
{
    using Site;

    using System.Configuration;

    public partial class CoreSection
    {
        [ConfigurationProperty("site", IsRequired = true)]
        public SiteElement Site
        {
            get
            {
                return (SiteElement)base["site"];
            }
        }
    }
}
