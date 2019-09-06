import { Injectable } from '@angular/core';
import AWSAppSyncClient from 'aws-appsync';
import aws_exports from '../../aws-exports';
import { AUTH_TYPE } from 'aws-appsync/lib/link/auth-link';
import { Auth } from 'aws-amplify';

@Injectable()
export class AppsyncService {

   // hc;
   _hc;

   constructor() {
     const client = new AWSAppSyncClient({
       url: "https://tv3cegztpfgs3gq7q5lncnb4qe.appsync-api.us-west-2.amazonaws.com/graphql",
       region: "us-west-2",
       auth: {
         type: AUTH_TYPE.API_KEY,
         apiKey: 'da2-k2ydeqflxfacvlixjakx6mbzj4'
       }
     });
     // this.hc = client.hydrated;
     this._hc = client;
   }
   hc() {
     return this._hc.hydrated();
   }
}
