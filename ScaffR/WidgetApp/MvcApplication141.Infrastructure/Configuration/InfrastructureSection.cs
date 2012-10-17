namespace MvcApplication141.Infrastructure.Configuration
{
    using System.Configuration;

    public partial class InfrastructureSection : ConfigurationSection
    {
        public static InfrastructureSection GetConfig()
        {
            return (InfrastructureSection)ConfigurationManager.GetSection("MvcApplication141/MvcApplication141.Infrastructure");
        }
    }
}
