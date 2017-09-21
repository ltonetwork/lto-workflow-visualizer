import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  items: any[] = [];
  activeIndex = 4;

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.items.push(i);
    }
  }

  ngOnInit() {
  }

}
