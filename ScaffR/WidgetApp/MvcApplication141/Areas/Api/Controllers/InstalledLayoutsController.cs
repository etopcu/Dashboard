namespace MvcApplication141.Areas.Api.Controllers
{
    using Core.Interfaces.Service;
    using Core.Model;

    public partial class InstalledLayoutsController : ApiController<InstalledLayout>
    {
	   protected IInstalledLayoutService InstalledLayoutService;

       public InstalledLayoutsController(IInstalledLayoutService service)
       {	       
           Service = InstalledLayoutService = service;
       }
    }
}
