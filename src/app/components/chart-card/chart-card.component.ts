import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss']
})
export class ChartCardComponent implements OnInit {

  colors = [{
    backgroundColor: ['#FF7360', '#6FC8CE', '#B9E8E0', '#FFFCC4', '#B9E8E0']
  }];

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Have to pay', 'Estimated price', 'something'];
  public barChartType = 'bar';
  public barChartLegend = false;

  public barChartData: any[] = [
    { data: [60000, 40000, -10080, 81, 56, 55, 40] }
  ];

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
  }

  onSelect(event: any) {
    console.log(event);
  }

}
