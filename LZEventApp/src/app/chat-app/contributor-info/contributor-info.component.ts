import { Component, OnInit } from '@angular/core';
import { int } from 'aws-sdk/clients/datapipeline';
import { AppsyncService } from '../appsync.service';
import { ObservableQuery } from 'apollo-client';
import { getEventQuery, getAllEventsQuery, getAllContributors} from '../graphql/operation-result-types';
import getContributors from '../graphql/queries/getContributors';
import Contributor from '../types/contributor';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-contributor-info',
  templateUrl: './contributor-info.component.html',
  styleUrls: ['./contributor-info.component.css']
})
export class ContributorInfoComponent implements OnInit {
  id:int
  eventContributor = new Contributor();
  constructor(private appsync: AppsyncService,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{this.id=params.id})
this.getContributorsForEvent();  
  }

  getContributorsForEvent() {
    this.appsync.hc().then(client => {
      const observable: ObservableQuery<getAllContributors> = client.watchQuery({
        query: getContributors,
        variables: { Id: this.id },
        fetchPolicy: 'cache-and-network'
      });

      observable.subscribe(({data}) => {
        console.log('Fetched convos data', data);
        //this.myEvents=new Array<Events>();
        if (data &&  data.getContributors) {
          
            this.eventContributor.amount=data.getContributors.amount;
            this.eventContributor.email=data.getContributors.email;
            this.eventContributor.notify=data.getContributors.notify;
            this.eventContributor.paid=data.getContributors.paid;
          
          
          // this.myEvent.EventName=data.getEvents.EventName;
          // this.myEvent.Id=data.getEvents.Id;
          
        }
      });

      return observable;
    });
  }

}
