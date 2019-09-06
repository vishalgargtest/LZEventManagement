import gql from 'graphql-tag';


export default gql`
query getEvent($Id:Int){
    getEvent(Id:$Id){
        Id
        EventName
  }
 }`;
