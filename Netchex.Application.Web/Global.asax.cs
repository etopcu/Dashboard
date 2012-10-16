using System.Reflection;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Netchex.DataAccess.Repositories;
using Ninject;
using Ninject.Web.Common;
using Netchex.Domain.Person;
using Netchex.Domain.Objects;
using Netchex.Security;
using Netchex.DataAccess;
using Netchex.DataAccess.Interfaces;
using System;
using System.Data.SqlClient;
using System.Data;
using Netchex.Framework.DashboardBuilder;

namespace Netchex.Application.Web
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode,
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : NinjectHttpApplication
    {

        protected override IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            kernel.Load(Assembly.GetExecutingAssembly());            
            kernel.Bind<ISecurityDataRepository>().To<SecurityDataRepository>().InRequestScope();
            kernel.Bind<SecurityResolver>().To<SecurityResolver>().InRequestScope();
            kernel.Bind<IDashboardBuilder>().To<DashboardBuilder>();
            kernel.Bind<IWidgetBuilder>().To<WidgetBuilder>();
            kernel.Bind<IDashboardRepository>().To<DashboardRepository>();
            kernel.Bind<ICategoryRepository>().To<CategoryRepository>();
            kernel.Bind<IWidgetRepository>().To<WidgetRepository>();
            kernel.Bind<IParameterRepository>().To<ParameterRepository>();
            kernel.Bind<IDbConnection>().To<SqlConnection>();

            var hrPremierString = WebConfigurationManager.ConnectionStrings["HRPremier"].ConnectionString.ToString();
            var securityString = WebConfigurationManager.ConnectionStrings["Security"].ConnectionString.ToString();
            Func<string, IDbConnection> DbConnection = (w) =>
            {
                var sqlConnection = (SqlConnection)kernel.Get(typeof(IDbConnection));
                sqlConnection.ConnectionString = w;
                sqlConnection.Open();
                return sqlConnection;
            };
            Func<string, IDbConnection> GetDatabase = (w) => DbConnection(w);

            kernel.Bind<SessionData>().ToMethod(Context => new SessionData(){ NetworkUserID = "dnewell6", IsEss = "No"});

            //kernel.Bind(typeof(DbContext)).ToMethod(context => new DbContext(connectionString)).InRequestScope();

            return kernel;
        }
        protected override void OnApplicationStarted()
        {
            base.OnApplicationStarted();
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

    }
}