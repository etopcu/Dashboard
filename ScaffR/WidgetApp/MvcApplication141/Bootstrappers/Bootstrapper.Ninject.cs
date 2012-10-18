[assembly: WebActivator.PreApplicationStartMethod(typeof(MvcApplication141.Bootstrappers.Bootstrapper), "Start")]
[assembly: WebActivator.ApplicationShutdownMethodAttribute(typeof(MvcApplication141.Bootstrappers.Bootstrapper), "Stop")]

namespace MvcApplication141.Bootstrappers
{
    using System;
    using System.Web;
    using System.Web.Http;
    using Core.Interfaces.Data;
    using Core.Interfaces.Service;
    using Data;
    using Infrastructure.DependencyInjection;
    using Microsoft.Web.Infrastructure.DynamicModuleHelper;
    using Ninject;
    using Ninject.Web.Common;
    using Service;

    public partial class Bootstrapper
    {
        private static readonly Ninject.Web.Common.Bootstrapper bootstrapper = new Ninject.Web.Common.Bootstrapper();

        /// <summary>
        /// Starts the application
        /// </summary>
        public static void Start()
        {
            DynamicModuleUtility.RegisterModule(typeof(OnePerRequestHttpModule));
            DynamicModuleUtility.RegisterModule(typeof(NinjectHttpModule));
            bootstrapper.Initialize(CreateKernel);
        }

        /// <summary>
        /// Stops the application.
        /// </summary>
        public static void Stop()
        {
            bootstrapper.ShutDown();
        }

        /// <summary>
        /// Creates the kernel that will manage your application.
        /// </summary>
        /// <returns>The created kernel.</returns>
        private static IKernel CreateKernel()
        {
            var kernel = new StandardKernel();
            kernel.Bind<Func<IKernel>>().ToMethod(ctx => () => new Ninject.Web.Common.Bootstrapper().Kernel);
            kernel.Bind<IHttpModule>().To<HttpApplicationInitializationHttpModule>();
            GlobalConfiguration.Configuration.DependencyResolver = new NinjectResolver(kernel);
            RegisterServices(kernel);
            return kernel;
        }

        /// <summary>
        /// Load your modules or register your services here!
        /// </summary>
        /// <param name="kernel">The kernel.</param>
        private static void RegisterServices(IKernel kernel)
        {
            kernel.Bind<IUnitOfWork>().To<UnitOfWork>();
            kernel.Bind<IDatabaseFactory>().To<DatabaseFactory>();
            kernel.Bind<IAvailableWidgetsService>().To<AvailableWidgetsService>();
            kernel.Bind<IAvailableWidgetsRepository>().To<AvailableWidgetsRepository>();
            kernel.Bind<IAvailableLayoutService>().To<AvailableLayoutService>();
            kernel.Bind<IAvailableLayoutRepository>().To<AvailableLayoutRepository>();
            kernel.Bind<IDashboardService>().To<DashboardService>();
            kernel.Bind<IDashboardRepository>().To<DashboardRepository>();
        }   
    }
}