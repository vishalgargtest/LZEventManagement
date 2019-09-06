using Amazon.SimpleEmail;
using Amazon.SimpleEmail.Model;
using EmailNotification.Contracts;
using EmailNotification.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace EmailNotification.Business
{
    public class EmailNotifier : INotifier<SendEmailSNSRequest, NotifierResponse>
    {
        public EmailNotifier(IConfigurationRoot configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public async Task<NotifierResponse> Notify(SendEmailSNSRequest request)
        {
            var lambdaresponse = new NotifierResponse
            {
                ResponseData = "Failed"
            };

            var configSet = Configuration["configSet"];
           
            using (var client = new AmazonSimpleEmailServiceClient())
            {
                var sendRequest = new SendEmailRequest
                {
                    Source = request.From,
                    Destination = new Destination
                    {
                        ToAddresses = request.To.ToList()                   
                    },
                    Message = new Message
                    {
                        Subject = new Content(request.Subject),
                        Body = new Body
                        {
                            Html = new Content
                            {
                                Charset = "UTF-8",
                                Data = request.HtmlBody
                            },
                            Text = new Content
                            {
                                Charset = "UTF-8",
                                Data = request.Body
                            }
                        }
                    },
                    // If you are not using a configuration set, comment
                    // or remove the following line 
                    ConfigurationSetName = configSet
                };
                try
                {
                    Console.WriteLine("Sending email using Amazon SES...");
                    var response = await client.SendEmailAsync(sendRequest).ConfigureAwait(false);
                    Console.WriteLine("The email was sent successfully.");
                    lambdaresponse.ResponseData = "Success";
                }
                catch (Exception ex)
                {
                    Console.WriteLine("The email was not sent.");
                    Console.WriteLine("Error message: " + ex.Message);
                }

                return lambdaresponse;
            }
        }
    }
}
