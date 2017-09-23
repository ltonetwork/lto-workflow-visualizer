import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';

import * as projectionJS from './js/main';

@Injectable()
export class ProjectionJsService {

  private id: string;
  private key: string;

  constructor() { }


  loadProjection(projectID: string, key: string): Observable<any> {
    this.id = projectID;
    this.key = key;

    return Observable.fromPromise(projectionJS.getProject(projectID, key));
  }

  getScenario(): Observable<any> {
    return Observable.fromPromise(projectionJS.getScenario(this.id));
  }

  getEvents(): Observable<any> {
    return Observable.fromPromise(projectionJS.getEvents(this.id)).map((data: any) => {
      return data.map((eventJsonStr: any) => JSON.parse(eventJsonStr));
    });
  }

}
