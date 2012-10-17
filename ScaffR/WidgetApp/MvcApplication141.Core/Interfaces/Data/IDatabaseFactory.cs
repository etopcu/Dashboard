namespace MvcApplication141.Core.Interfaces.Data
{
    using System;

    public interface IDatabaseFactory : IDisposable
    {
        IDataContext Get();
    }
}