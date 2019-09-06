import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppsyncService } from '../chat-app/appsync.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private appsync: AppsyncService) {}

  ngOnInit() {
    console.log(this.appsync.hc());
  }

}
