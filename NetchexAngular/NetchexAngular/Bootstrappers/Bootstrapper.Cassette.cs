namespace NetchexAngular.Bootstrappers
{
    using Cassette;
    using Cassette.Scripts;
    using Cassette.Stylesheets;

    public partial class Bootstrapper : IConfiguration<BundleCollection>
	{
        public void Configure(BundleCollection configurable)
        {
            configurable.AddPerSubDirectory<StylesheetBundle>("Content/bundles");            
            configurable.AddPerSubDirectory<StylesheetBundle>("Content/themes/base");
            configurable.AddPerSubDirectory<ScriptBundle>("Scripts");
            configurable.AddPerSubDirectory<ScriptBundle>("Scripts/lib", bundle => bundle.PageLocation = "vendor", true);
            configurable.AddPerSubDirectory<ScriptBundle>("Areas/Dashboard/Scripts/js");
            configurable.AddPerSubDirectory<StylesheetBundle>("Areas/Dashboard/content/less");
        }
	}
}