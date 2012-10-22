namespace NetchexAngular.Core.Configuration
{
    using System.Configuration;

    public partial class CoreSection : ConfigurationSection
    {
        public static CoreSection GetConfig()
        {
            return (CoreSection)ConfigurationManager.GetSection("NetchexAngular/NetchexAngular.Core");
        }       
    }
}
