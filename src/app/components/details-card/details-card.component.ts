import { Component, OnInit, Input } from '@angular/core';
import { Item } from '@app/classes';

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.scss']
})
export class DetailsCardComponent implements OnInit {
  @Input() public item: Item;
  constructor() { }

  ngOnInit() {
  }

}
