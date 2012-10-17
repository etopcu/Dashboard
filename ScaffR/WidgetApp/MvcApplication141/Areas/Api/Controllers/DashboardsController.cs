namespace MvcApplication141.Areas.Api.Controllers
{
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;
    using Core.Interfaces.Service;
    using Core.Model;

    public partial class DashboardsController : ApiController<Dashboard>
    {
	   protected IDashboardService DashboardService;

       public DashboardsController(IDashboardService service)
       {	       
           Service = DashboardService = service;
       }

        [HttpGet]
       public virtual HttpResponseMessage GetByUserId(int userId)
       {
           Dashboard item = Service.GetById(userId);
           var response = Request.CreateResponse(HttpStatusCode.Created, item);
           if (item == null)
           {
               throw new HttpResponseException(HttpStatusCode.NotFound);
           }

           return response;
       }

    }
}
