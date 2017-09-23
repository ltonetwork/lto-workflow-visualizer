import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import * as projectionJS from './js/main';

@Injectable()
export class ProjectionJsService {

  constructor() { }


  loadProjection(projectID: string, key: string): Observable<any> {
    return Observable.fromPromise(projectionJS(projectID, key));
  }

}
