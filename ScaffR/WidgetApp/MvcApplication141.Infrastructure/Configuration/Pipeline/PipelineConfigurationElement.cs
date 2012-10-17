using System.Configuration;

namespace MvcApplication141.Infrastructure.Configuration.Pipeline
{
    public class PipelineConfigurationElement : ConfigurationElement
    {
        [ConfigurationProperty("processor", IsRequired = false)]
        public string ProcessorType
        {
            get { return (string)base["processor"]; }
        }

        [ConfigurationProperty("filters", IsDefaultCollection = false)]       
        public ProviderSettingsCollection Filters
        {
            get { return (ProviderSettingsCollection)this["filters"]; }
        }
    }
}
