import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { SecureHttpClientService } from '@modules/auth';
import { Process } from '@classes/process';

@Injectable()
export class ProcessesProviderService {

  constructor(private http: SecureHttpClientService) { }

  get(id: string): Observable<Process> {
    return this.http.get('http://app.docarama.com/service/flow/processes/' + id).map((data: any) => new Process(data));
  }

}
