namespace MvcApplication141.Data
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.Linq;

    using MvcApplication141.Core.Interfaces.Data;
    using MvcApplication141.Core.Model;

    public partial class UnitOfWork : IUnitOfWork
    {        
        private readonly IDatabaseFactory _databaseFactory;
        private IDataContext _datacontext;

        public UnitOfWork(IDatabaseFactory databaseFactory)
        {
            this._databaseFactory = databaseFactory;
            this.DataContext.ObjectContext().SavingChanges += (sender, e) => BeforeSave(this.GetChangedOrNewEntities());
        }

        public IDataContext DataContext
        {
            get { return this._datacontext ?? (this._datacontext = this._databaseFactory.Get()); }
        }

        private IEnumerable<DomainObject> GetChangedOrNewEntities()
        {
            const EntityState NewOrModified = EntityState.Added | EntityState.Modified;

            return this.DataContext.ObjectContext().ObjectStateManager.GetObjectStateEntries(NewOrModified)
                .Where(x => x.Entity != null).Select(x => x.Entity as DomainObject);
        }

        public void BeforeSave(IEnumerable<DomainObject> entities)
        {
            foreach (var entity in entities)
            {
                entity.Updated = DateTime.Now;
                entity.Created = !IsPersistent(entity) ? DateTime.Now : entity.Created;
            }
        }

        public static bool IsPersistent(DomainObject entity)
        {
            return entity.Id != 0;
        }

        public int Commit()
        {
            return this.DataContext.ObjectContext().SaveChanges();
        }
    }
}
