namespace MvcApplication141.Infrastructure.Interfaces.Pipeline
{
    public interface ICoreProcessor<in T>
    {
        void Execute(T data);
    }
}
