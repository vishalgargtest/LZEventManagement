// tslint:disable
// this is an auto generated file. This will be overwritten

export const createConversation = `mutation CreateConversation($createdAt: String, $id: ID!, $name: String!) {
  createConversation(createdAt: $createdAt, id: $id, name: $name) {
    createdAt
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
    name
  }
}
`;
export const createMessage = `mutation CreateMessage(
  $content: String
  $conversationId: ID!
  $createdAt: String!
  $id: ID!
) {
  createMessage(
    content: $content
    conversationId: $conversationId
    createdAt: $createdAt
    id: $id
  ) {
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
export const createUser = `mutation CreateUser($username: String!) {
  createUser(username: $username) {
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
export const createUserConversations = `mutation CreateUserConversations($conversationId: ID!, $userId: ID!) {
  createUserConversations(conversationId: $conversationId, userId: $userId) {
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
