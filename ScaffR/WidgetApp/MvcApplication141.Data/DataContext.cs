namespace MvcApplication141.Data
{
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Objects;
	using System.Data.Entity.ModelConfiguration.Conventions;

    using Core.Interfaces.Data;
    using Core.Model;

    public partial class DataContext : DbContext, IDataContext
    {
// ReSharper disable RedundantArgumentDefaultValue
        public DataContext() : this(true)
// ReSharper restore RedundantArgumentDefaultValue
        {
        }

        public DataContext(bool proxyCreation = true)            
        {
            this.Configuration.ProxyCreationEnabled = proxyCreation;
        }

        public ObjectContext ObjectContext()
        {
            return ((IObjectContextAdapter)this).ObjectContext;
        }

        public virtual IDbSet<T> DbSet<T>() where T : DomainObject
        {
            return Set<T>();
        }

        public new DbEntityEntry Entry<T>(T entity) where T : DomainObject
        {
            return base.Entry(entity);
        }

		protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<AvailableWidget> AvailableWidgets { get; set; }

        public DbSet<Dashboard> Dashboards { get; set; }

        public DbSet<WidgetInstance> WidgetInstances { get; set; }

        public DbSet<Person> People { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<AvailableLayout> AvailableLayouts { get; set; }
    }    
}