import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContributorComponent } from './chat-app/contributor/contributor.component';
import {HomeComponent} from './home/home.component'
import {ContributorInfoComponent} from './chat-app/contributor-info/contributor-info.component'
import { AuthGuard } from '../app/chat-app/auth-guard.service';
const routes: Routes = [
  { 
    path: 'contributor', 
    component: ContributorComponent,
    canActivate: [AuthGuard],
    children:[
      {
      path:"test/:id",
      component:ContributorInfoComponent
      }
  ]
  },
  {
    path:'',component:HomeComponent
  },
  {
    path:'test/:id',
    component:ContributorInfoComponent
   // canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
