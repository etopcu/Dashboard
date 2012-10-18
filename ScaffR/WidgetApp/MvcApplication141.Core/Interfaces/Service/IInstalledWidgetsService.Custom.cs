namespace MvcApplication141.Core.Interfaces.Service
{
    using System.Linq;
    using Model;

    public partial interface IAvailableWidgetsService : IService<AvailableWidget>
    {
        IQueryable<AvailableWidget> GetWidgetsByCategory(int categoryId);
    }
}