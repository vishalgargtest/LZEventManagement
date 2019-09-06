using Amazon.Lambda.SNSEvents;
using System;
using System.Collections.Generic;
using System.Text;
using static Amazon.Lambda.SNSEvents.SNSEvent;

namespace EmailNotification.Models.Extenstions
{
    public static class ModelExtenstions
    {
        public static SendEmailSNSRequest ToSendEmailRequest(this SNSEvent message)
        {
           return Newtonsoft.Json.JsonConvert.DeserializeObject<SendEmailSNSRequest>(message.Records[0].Sns.Message);
        }
    }
}
