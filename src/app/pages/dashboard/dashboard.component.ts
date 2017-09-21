import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ProcessesProviderService } from '@services/processes-provider';
import { Process } from '@classes/process';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public doughnutChartLabels: string[] = ['Completion'];
  public doughnutChartData: number[] = [70, 30];
  public doughnutChartType = 'doughnut';

  showSource = false;
  process$: Observable<Process>;

  constructor(
    public processesProvider: ProcessesProviderService
  ) { }

  ngOnInit() {
    this.process$ = this.processesProvider.get('59c3ee516f19782c243f9962');
  }

  toggleTimelineSource(event: any) {
    this.showSource = event['checked'];
  }
}
