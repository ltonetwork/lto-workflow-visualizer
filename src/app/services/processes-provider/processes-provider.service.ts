import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { SecureHttpClientService } from '@modules/auth';
import { Process } from '@classes/process';

@Injectable()
export class ProcessesProviderService {
  public process$: BehaviorSubject<Process>;

  constructor(private http: SecureHttpClientService) { }

  load(id: string): Observable<Process> {
    if (this.process$) {
      return this.process$;
    }

    return this.http.get('http://app.docarama.com/service/flow/processes/' + id)
    .map((data: any) => {
      // Augment data with necessary info
      data['item'] = {
        title: 'Car',
        description: 'Some description about car from officer which repossesed it. Or maybe some additional info which appered later.',
        location: {
          lat: 51.678418,
          lng: 7.809007
        },
        information: [{
          title: 'Merk',
          description: 'BWM'
        }, {
          title: 'Mileage',
          description: '47521km'
        }, {
          title: 'Fuel',
          description: 'Benzine'
        }, {
          title: 'Estimated price',
          description: '16000eur'
        }]
      };

      data['finance'] = {
        fine: 15000,
        sellPrice: 16000,
        saldo: -1000
      };

      return data;
    })
    .map((data: any) => new Process(data))
    .do((process) => {
      this.process$ = new BehaviorSubject<Process>(process);
    });
  }

}
