using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using Microsoft.Extensions.Configuration;
using System.IO;
using EmailNotification.Models;
using static Amazon.Lambda.SNSEvents.SNSEvent;
using EmailNotification.Contracts;
using MediatR;
using EmailNotification.Business;
using EmailNotification.Models.Extenstions;
using Amazon.Lambda.SNSEvents;
using Amazon.Lambda.Serialization.Json;
using System.Text;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

namespace EmailNotification
{
    public class NotificationFunction
    {
        private readonly IConfigurationRoot _configuration;
        private readonly INotifier<SendEmailSNSRequest, NotifierResponse> _notifier;
        private readonly JsonSerializer _serializer;

        /// <summary>
        /// Default constructor that Lambda will invoke.
        /// </summary>
        public NotificationFunction()
        {
            _configuration = new ConfigurationBuilder()
                  .SetBasePath(Directory.GetCurrentDirectory())
                  .AddJsonFile("appsettings.json", optional: true)
                  .AddJsonFile("appsettings.test.json", optional: true)
                  .AddEnvironmentVariables()
                  .Build();

            _notifier = new EmailNotifier(_configuration);
            _serializer = new JsonSerializer();
        }


        /// <summary>
        /// A Lambda function to respond to HTTP Get methods from API Gateway
        /// </summary>
        /// <param name="request"></param>
        /// <returns>The list of blogs</returns>
        public async Task<NotifierResponse> TriggerEmailAsync(SNSEvent snsEvent, ILambdaContext context)
        {
            var snsMessageJson = Newtonsoft.Json.JsonConvert.SerializeObject(snsEvent);
            context.Logger.LogLine(snsMessageJson);
            
            var response = await _notifier.Notify(snsEvent.ToSendEmailRequest());
            return response;
        }

        protected string SerializeObject<T>(T objectToSerialize)
        {
            using (var ms = new MemoryStream())
            {
                _serializer.Serialize(objectToSerialize, ms);
                return Encoding.UTF8.GetString(ms.ToArray());
            }
        }
    }

}
