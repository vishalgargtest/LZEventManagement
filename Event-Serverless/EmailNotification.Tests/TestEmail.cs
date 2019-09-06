using Amazon.Lambda.SNSEvents;
using Amazon.Lambda.TestUtilities;
using EmailNotification.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;
using static Amazon.Lambda.SNSEvents.SNSEvent;

namespace EmailNotification.Tests
{
    public class EmailLambdaTest
    {
        [Fact]
        public async Task TestEmailSending()
        {
            var message = new SNSEvent
            {
                Records = new List<SNSRecord> { new SNSRecord()}
            };

            var request = new SendEmailSNSRequest
            {
                From = "rshakya@xpanxion.com",
                To = new List<string> { "rshakya@legalzoom.com" },
                Body = "test",
                Subject = "Test",
                HtmlBody = "",
                FromName = "Rahul"
            };

            var context = new TestLambdaContext();
            message.Records[0].Sns.Message = Newtonsoft.Json.JsonConvert.SerializeObject(request);
            var lambda = new NotificationFunction();

            var response = await lambda.TriggerEmailAsync(message, context);

            Assert.NotNull(response);
        }
    }
}
