import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MdSelectionList } from '@angular/material';
import { Item } from '@app/classes';

@Component({
  selector: 'app-location-history-card',
  templateUrl: './location-history-card.component.html',
  styleUrls: ['./location-history-card.component.scss']
})
export class LocationHistoryCardComponent implements OnInit {
  @Input() public item: Item;
  selectedLocation: any;

  @ViewChild(MdSelectionList) list: MdSelectionList;

  constructor() { }

  ngOnInit() {
  }

  selectLocation(location: any) {
    this.selectedLocation = location;
  }

  dropSelectedLocation(event: any) {
    if (event['toElement']['className'] === 'mat-card-content') {
      this.selectedLocation = null;
    }
  }

}
