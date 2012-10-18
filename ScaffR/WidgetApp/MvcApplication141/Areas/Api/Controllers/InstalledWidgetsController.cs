namespace MvcApplication141.Areas.Api.Controllers
{
    using Core.Interfaces.Service;
    using Core.Model;

    public partial class AvailableWidgetsController : ApiController<AvailableWidget>
    {
	   protected IAvailableWidgetsService AvailableWidgetsService;

       public AvailableWidgetsController(IAvailableWidgetsService service)
       {	       
           Service = AvailableWidgetsService = service;
       }
    }
}
