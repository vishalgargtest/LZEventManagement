// tslint:disable
// this is an auto generated file. This will be overwritten

export const subscribeToNewMessage = `subscription SubscribeToNewMessage($conversationId: ID!) {
  subscribeToNewMessage(conversationId: $conversationId) {
    author {
      cognitoId
      id
      username
      registered
    }
    content
    conversationId
    createdAt
    id
    isSent
    recipient {
      cognitoId
      id
      username
      registered
    }
    sender
  }
}
`;
export const subscribeToNewUCs = `subscription SubscribeToNewUCs($userId: ID!) {
  subscribeToNewUCs(userId: $userId) {
    associated {
      associated {
        conversationId
        userId
      }
      conversation {
        createdAt
        id
        name
      }
      conversationId
      user {
        cognitoId
        id
        username
        registered
      }
      userId
    }
    conversation {
      createdAt
      id
      name
    }
    conversationId
    user {
      cognitoId
      id
      username
      registered
    }
    userId
  }
}
`;
export const subscribeToNewUsers = `subscription SubscribeToNewUsers {
  subscribeToNewUsers {
    cognitoId
    conversations {
      nextToken
      userConversations {
        associated {
          conversationId
          userId
        }
        conversationId
        userId
      }
    }
    id
    messages {
      messages {
        content
        conversationId
        createdAt
        id
        isSent
        sender
      }
      nextToken
    }
    username
    registered
  }
}
`;
