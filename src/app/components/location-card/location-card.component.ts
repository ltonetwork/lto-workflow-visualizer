import { Component, OnInit, Input } from '@angular/core';
import { Item } from '@app/classes';

@Component({
  selector: 'app-location-card',
  templateUrl: './location-card.component.html',
  styleUrls: ['./location-card.component.scss']
})
export class LocationCardComponent implements OnInit {

  @Input() public item: Item;

  constructor() { }

  ngOnInit() {
  }

}
