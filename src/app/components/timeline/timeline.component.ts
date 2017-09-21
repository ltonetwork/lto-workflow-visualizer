import { Component, OnInit, Input } from '@angular/core';

import { Process } from '@classes/process';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input() process: Process;

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
