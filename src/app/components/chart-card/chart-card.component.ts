import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Finance } from '@app/classes';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss']
})
export class ChartCardComponent implements OnInit {

  @Input() public finance: Finance;

  colors = [{
    backgroundColor: ['#FF7360', '#6FC8CE', '#B9E8E0', '#FFFCC4', '#B9E8E0']
  }];

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Boete', 'Opbrengst verkoop', 'Saldo'];
  public barChartType = 'bar';
  public barChartLegend = false;

  // public barChartData: any[] = [
  //   { data: [60000, 40000, -10080, 81, 56, 55, 40] }
  // ];
  public barChartData: any[];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor() {
  }

  ngOnInit() {
    if (!this.finance) {
      return;
    }

    this.barChartData = [{ data: [this.finance.fine, this.finance.sellPrice, this.finance.saldo] }];
  }

  onSelect(event: any) {
    console.log(event);
  }

}
