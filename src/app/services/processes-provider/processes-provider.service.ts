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
        fine: 60000,
        sellPrice: 50000,
        saldo: 10000
      };

      return data;
    })
    .map((data: any) => new Process(data));
  }

}
