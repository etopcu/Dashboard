namespace MvcApplication141.Core.Configuration
{
    using System.Configuration;

    public partial class CoreSection : ConfigurationSection
    {
        public static CoreSection GetConfig()
        {
            return (CoreSection)ConfigurationManager.GetSection("MvcApplication141/MvcApplication141.Core");
        }       
    }
}
