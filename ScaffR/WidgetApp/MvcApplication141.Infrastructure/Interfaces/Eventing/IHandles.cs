namespace MvcApplication141.Infrastructure.Interfaces.Eventing
{
    public interface IHandles<T>
    {
        void OnEvent(T e);
    }
}