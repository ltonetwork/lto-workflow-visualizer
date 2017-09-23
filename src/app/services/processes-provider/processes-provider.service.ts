import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { SecureHttpClientService } from '@modules/auth';
import { Process } from '@classes/process';

import { ProjectionJsService } from '../projection-js/projection-js.service';
import { DUMMY } from './dummy';


@Injectable()
export class ProcessesProviderService {
  public process$: BehaviorSubject<Process>;

  constructor(private projection: ProjectionJsService) { }

  load(id: string, key: string): Observable<Process> {
    if (this.process$) {
      return this.process$;
    }

    return this.projection.loadProjection(id, key)
      .map((data: any) => {
        return data;
      })
      .map((data: any) => new Process(data))
      .do((process) => {
        this.process$ = new BehaviorSubject<Process>(process);
      });
  }

}
