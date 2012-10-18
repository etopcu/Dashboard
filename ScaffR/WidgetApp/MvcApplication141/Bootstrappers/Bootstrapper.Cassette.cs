namespace MvcApplication141.Bootstrappers
{
    using Cassette;
    using Cassette.Scripts;
    using Cassette.Stylesheets;

    public partial class Bootstrapper : IConfiguration<BundleCollection>
	{
        public void Configure(BundleCollection configurable)
        {
            configurable.AddPerSubDirectory<StylesheetBundle>("Content/custom");
            configurable.AddPerSubDirectory<StylesheetBundle>("Content/Framework");
            configurable.AddPerSubDirectory<StylesheetBundle>("Content/themes/base");

			configurable.AddPerSubDirectory<ScriptBundle>("Scripts/Framework");
            configurable.AddPerSubDirectory<ScriptBundle>("Scripts/Custom");
        }
	}
}