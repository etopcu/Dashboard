namespace MvcApplication141.Areas.Api.Controllers
{
    using Core.Interfaces.Service;
    using Core.Model;

    public partial class AvailableLayoutsController : ApiController<AvailableLayout>
    {
	   protected IAvailableLayoutService AvailableLayoutService;

       public AvailableLayoutsController(IAvailableLayoutService service)
       {	       
           Service = AvailableLayoutService = service;
       }
    }
}
