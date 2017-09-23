import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { SecureHttpClientService } from '@modules/auth';
import { Process } from '@classes/process';
import { DUMMY } from './dummy';


@Injectable()
export class ProcessesProviderService {
  public process$: BehaviorSubject<Process>;

  constructor(private http: SecureHttpClientService) { }

  load(id: string): Observable<Process> {
    if (this.process$) {
      return this.process$;
    }

    return Observable.of(DUMMY)
      .map((data: any) => {
        return data;
      })
      .map((data: any) => new Process(data))
      .do((process) => {
        this.process$ = new BehaviorSubject<Process>(process);
      });
  }

}
