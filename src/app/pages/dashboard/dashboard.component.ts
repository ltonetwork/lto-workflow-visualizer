import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {trigger, state, animate, style, transition} from '@angular/animations';
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
  process: Process;

  constructor(
    public processesProvider: ProcessesProviderService,
    public router: Router
  ) { }

  ngOnInit() {
    this.processesProvider.load('59c3ecb56f197830243f9961').take(1).subscribe(p => this.process = p);
    // this.process$ = this.processesProvider.process$;
    // if (!this.process$) {
    //   this.router.navigate(['']);
    // }
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
