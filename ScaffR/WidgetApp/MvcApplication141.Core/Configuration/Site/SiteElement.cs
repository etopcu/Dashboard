namespace MvcApplication141.Core.Configuration.Site
{
	using System;
	using System.Configuration;

    public partial class SiteElement : ConfigurationElement
    {
        [ConfigurationProperty("instanceId")]
        public Guid InstanceId
        {
            get { return (Guid) base["instanceId"]; }
            set { base["instanceId"] = value; }
        }

        [ConfigurationProperty("version")]
        public string Version
        {
            get { return (string) base["version"]; }
            set { base["version"] = value; }
        }

        [ConfigurationProperty("email", IsRequired = true)]
        public string EmailAddress
        {
            get { return (string)base["email"]; }
            set { base["email"] = value; }
        }

        [ConfigurationProperty("companyName", IsRequired = true)]
        public string CompanyName
        {
            get { return (string)base["companyName"]; }
            set { base["companyName"] = value; }
        }

        [ConfigurationProperty("websiteName", IsRequired = true)]
        public string WebsiteName
        {
            get { return (string)base["websiteName"]; }
            set { base["websiteName"] = value; }
        }
    }
}