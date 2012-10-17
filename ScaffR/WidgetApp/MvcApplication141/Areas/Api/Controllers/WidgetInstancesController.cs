namespace MvcApplication141.Areas.Api.Controllers
{
    using Core.Interfaces.Service;
    using Core.Model;

    public partial class WidgetInstancesController : ApiController<WidgetInstance>
    {
	   protected IWidgetInstanceService WidgetInstanceService;

       public WidgetInstancesController(IWidgetInstanceService service)
       {	       
           Service = WidgetInstanceService = service;
       }
    }
}
