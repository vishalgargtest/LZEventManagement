import { Component, OnInit } from '@angular/core';
import Contributor from '../types/contributor';

import {Events} from '../types/Events'
import { AppsyncService } from '../appsync.service';
import { getEventQuery, getAllEventsQuery } from '../graphql/operation-result-types';
import { ObservableQuery } from 'apollo-client';
import getEvents from '../graphql/queries/getAllEvents';
import { forEach } from '@angular/router/src/utils/collection';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contributor',
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.css']
})
export class ContributorComponent implements OnInit {

  //myEvent:Events={Id:0,EventName:""};
   myEvents = new Array<Events>();
   indEvent=new Events();

  constructor(private appsync: AppsyncService,private router:Router) { }

  ngOnInit() {
    this.getAllContributors();
  }
test(value : string){
  this.router.navigateByUrl('/test/'+value);
}
  getAllContributors() {
    this.myEvents=new Array<Events>();
    this.appsync.hc().then(client => {
      const observable: ObservableQuery<getAllEventsQuery> = client.watchQuery({
        query: getEvents,
        variables: { Id: 1 },
        fetchPolicy: 'cache-and-network'
      });

      observable.subscribe(({data}) => {
        console.log('Fetched convos data', data);
        this.myEvents=new Array<Events>();
        if (data &&  data.getEvents) {
          for(var i=0;i<data.getEvents.length;i++){
            this.indEvent=new Events();
            this.indEvent.EventName=data.getEvents[i].EventName;
            this.indEvent.Id=data.getEvents[i].Id;
            this.indEvent.EventID=data.getEvents[i].EventId;
            this.myEvents.push(this.indEvent);
          }
          
          // this.myEvent.EventName=data.getEvents.EventName;
          // this.myEvent.Id=data.getEvents.Id;
          
        }
      });

      return observable;
    });
  }
}
