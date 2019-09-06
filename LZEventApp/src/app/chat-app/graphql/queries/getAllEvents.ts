import gql from 'graphql-tag';


export default gql`
query getEvents{
    getEvents{
        Id
        EventName
        EventId
  }
 }`;
