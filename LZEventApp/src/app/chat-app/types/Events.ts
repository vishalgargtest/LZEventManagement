// import { int } from "aws-sdk/clients/datapipeline";

// export type Events= {
//     // A unique identifier for the Conversation.
//     Id: int;
//     // The Conversation's name.
//     EventName: string;
//     // The Conversation's timestamp.

//   }

import { int } from "aws-sdk/clients/datapipeline";

export class Events {
    // A unique identifier for the Conversation.
    Id: int;
    // The Conversation's name.
    EventName: string;
    // The Conversation's timestamp.
    EventID:int

  }


