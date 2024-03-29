namespace MvcApplication141.Infrastructure.Pipeline
{
    using System.Collections.Generic;

    public class FilterChain<T> : List<Filter<T>>
    {
        internal bool Process(ref T data, bool stopOnFailure)
        {
            bool success = true;
            foreach (Filter<T> processor in this)
            {
                if (!processor.Process(ref data))
                    success = false;

                if (stopOnFailure && !success)
                    break;
            }
            return success;
        }

        internal bool Process(ref T data)
        {
            return Process(ref data, false);
        }
    }
}
