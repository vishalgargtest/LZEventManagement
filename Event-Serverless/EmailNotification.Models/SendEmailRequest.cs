using System.Collections.Generic;

namespace EmailNotification.Models
{
    public class SendEmailSNSRequest
    {
       public string From { get; set; }
       public string FromName { get; set; }
       public IList<string> To { get; set; }    
       public string Subject { get; set; }
       public string Body { get; set; }
        public string HtmlBody { get; set; }
    }
}
