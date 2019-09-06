import gql from 'graphql-tag';

export default gql`
query getContributors($Id:ID!){
  getContributors(Id:$Id){
   email
   paid
   notify
   amount
  }
 }`;
