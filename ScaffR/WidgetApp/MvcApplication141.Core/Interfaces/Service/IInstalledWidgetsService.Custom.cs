namespace MvcApplication141.Core.Interfaces.Service
{
    using System.Linq;
    using Model;

    public partial interface IInstalledWidgetsService : IService<InstalledWidget>
    {
        IQueryable<InstalledWidget> GetWidgetsByCategory(int categoryId);
    }
}