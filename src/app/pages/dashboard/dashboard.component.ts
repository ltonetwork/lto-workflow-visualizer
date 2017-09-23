import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {trigger, state, animate, style, transition} from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { ProcessesProviderService } from '@services/processes-provider';
import { Process } from '@classes/process';

import { ProjectionJsService } from '@services/projection-js/projection-js.service';

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

  public eventsSource$: Observable<any>;
  public scenarioSource$: Observable<any>;

  sourceVisible = false;
  process$: Observable<Process>;
  process: Process;

  constructor(
    public processesProvider: ProcessesProviderService,
    public router: Router,
    public projection: ProjectionJsService
  ) {
    this.eventsSource$ = this.projection.getEvents();
    this.scenarioSource$ = this.projection.getScenario();
  }

  ngOnInit() {
    if (!this.processesProvider.process$) {
      this.router.navigate(['']);
      return;
    }
    this.processesProvider.process$.take(1).subscribe(p => this.process = p);
  }

  toggleTimelineSource(event: any) {
    this.showSource = event['checked'];
  }

  showSource() {
    this.sourceVisible = true;
    document.body.style['overflow'] = 'hidden';
  }

  hideSource() {
    this.sourceVisible = false;
    document.body.style['overflow'] = '';
  }
}
