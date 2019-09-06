using System;
using System.Threading.Tasks;

namespace EmailNotification.Contracts
{
    /// <summary>
    /// There can be multiple notifiers available.
    /// For ex. Email Notifier. 
    /// SMS  notfier. 
    /// Whatsapp notifier.
    /// </summary>
    /// <typeparam name="TRequest"></typeparam>
    /// <typeparam name="TResponse"></typeparam>
    public interface INotifier<TRequest, TResponse> where TRequest : class 
                                                   where TResponse : class
    {
        Task<TResponse> Notify(TRequest request);
    }
}
