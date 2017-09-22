import { Component, OnInit } from '@angular/core';
import {trigger, state, animate, style, transition} from '@angular/animations';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { ProcessesProviderService } from '@services/processes-provider';
import { Process } from '@classes/process';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [trigger('routerTransition', [
    transition(':leave', [])
  ])]
})
export class DashboardComponent implements OnInit {
  public doughnutChartLabels: string[] = ['Completion'];
  public doughnutChartData: number[] = [70, 30];
  public doughnutChartType = 'doughnut';

  sourceVisible = false;
  process$: Observable<Process>;

  constructor(
    public processesProvider: ProcessesProviderService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.process$ = this.route.params.switchMap((params) => {
      return this.processesProvider.get(params['id']);
    });
  }

  toggleTimelineSource(event: any) {
    this.showSource = event['checked'];
  }

  showSource() {
    this.sourceVisible = true;
  }

  hideSource() {
    this.sourceVisible = false;
  }
}
