using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Netchex.DataAccess.Repositories
{
    public interface IRepository<T> where T : class
    {
        IQueryable<T> GetAll();
        T Get(object id);
        void Add(T value);
        void Delete(T value);
        void Update(T value);
    }

    public interface IRepository
    {
        IQueryable GetAll();
        object Get(object id);
        void Add(object value);
        void Delete(object value);
        void Update(object value);
    }

    //public class Repository<T> : IRepository<T>, IRepository where T : class
    //{
    //    //http://mikehadlow.blogspot.com/2008/03/using-irepository-pattern-with-linq-to.html
    //}
}