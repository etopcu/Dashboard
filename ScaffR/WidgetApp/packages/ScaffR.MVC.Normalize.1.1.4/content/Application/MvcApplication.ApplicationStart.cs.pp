namespace $rootnamespace$.Application
{
    using System.Web.Mvc;

    public partial class MvcApplication
	{
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
        }
	}
}