import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showSource = false;

  constructor() { }

  ngOnInit() {
  }

  toggleTimelineSource(event: any) {
    this.showSource = event['checked'];
  }
}
