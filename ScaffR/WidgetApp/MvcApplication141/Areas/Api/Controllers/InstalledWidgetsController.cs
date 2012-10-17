namespace MvcApplication141.Areas.Api.Controllers
{
    using Core.Interfaces.Service;
    using Core.Model;

    public partial class InstalledWidgetsController : ApiController<InstalledWidget>
    {
	   protected IInstalledWidgetsService InstalledWidgetsService;

       public InstalledWidgetsController(IInstalledWidgetsService service)
       {	       
           Service = InstalledWidgetsService = service;
       }
    }
}
