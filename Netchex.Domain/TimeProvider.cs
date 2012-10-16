using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Netchex.Domain
{
    /// <summary>
    ///  var now = TimeProvider.Current.UtcNow;
    ///  In a unit test, you can replace TimeProvider.Current with a Test Double/Mock object. Example using Moq:
    ///  var timeMock = new Mock<TimeProvider>();
    ///  timeMock.SetupGet(tp => tp.UtcNow).Returns(new DateTime(2010, 3, 11));
    ///  TimeProvider.Current = timeMock.Object;
    ///  However, when unit testing with static state, always remember to tear down your fixture by calling TimeProvider.ResetToDefault().
    /// </summary>
    public abstract class TimeProvider
    {
        private static TimeProvider current = DefaultTimeProvider.Instance;

        public static TimeProvider Current
        {
            get { return TimeProvider.current; }
            set
            {
                if (value == null)
                {
                    throw new ArgumentNullException("value");
                }
                TimeProvider.current = value;
            }
        }

        public abstract DateTime UtcNow { get; }

        public static void ResetToDefault()
        {
            TimeProvider.current = DefaultTimeProvider.Instance;
        }            

    }


    public class DefaultTimeProvider : TimeProvider
    {
        private readonly static DefaultTimeProvider instance =
            new DefaultTimeProvider();

        private DefaultTimeProvider() { }

        public override DateTime UtcNow
        {
            get { return DateTime.UtcNow; }
        }

        public static DefaultTimeProvider Instance
        {
            get { return DefaultTimeProvider.instance; }
        }
    } 

}
