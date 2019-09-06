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
using Amazon.SimpleNotificationService;
using Amazon.SimpleNotificationService.Model;
using System.Text;
using AmazonSerializer = Amazon.Lambda.Serialization.Json;
using Newtonsoft.Json;

namespace EmailNotification
{
    public class AppSyncNotifyFunction
    {
        private readonly IConfigurationRoot _configuration;
        private IAmazonSimpleNotificationService _snsClient;
        private readonly AmazonSerializer.JsonSerializer _serializer;

        /// <summary>
        /// Default constructor that Lambda will invoke.
        /// </summary>
        public AppSyncNotifyFunction()
        {
            _configuration = new ConfigurationBuilder()
                  .SetBasePath(Directory.GetCurrentDirectory())
                  .AddJsonFile("appsettings.json", optional: true)
                  .AddJsonFile("appsettings.test.json", optional: true)
                  .AddEnvironmentVariables()
                  .Build();
            _snsClient = new AmazonSimpleNotificationServiceClient();
            _serializer = new AmazonSerializer.JsonSerializer();
        }


        /// <summary>
        /// A Lambda function to respond to HTTP Get methods from API Gateway
        /// </summary>
        /// <param name="request"></param>
        /// <returns>The list of blogs</returns>
        public async Task<string> ExecuteAsync(AppSyncRequest message, ILambdaContext context)
        {
            var request = new PublishRequest {
                Message = SerializeObject(message.request),
                TopicArn = _configuration["ChatStartedTopicArn"],
                MessageAttributes = new Dictionary<string, MessageAttributeValue>()
            };

            context.Logger.LogLine(JsonConvert.SerializeObject(request));
            var response = await _snsClient.PublishAsync(request);
            context.Logger.LogLine($"{JsonConvert.SerializeObject(response)}");
            return "success";
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
