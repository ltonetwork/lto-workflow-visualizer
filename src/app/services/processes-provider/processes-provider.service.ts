import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { SecureHttpClientService } from '@modules/auth';
import { Process } from '@classes/process';

const DUMMY = {
  'actors': {
    'politie': {
      'title': 'Politie'
    },
    'forensisch_opsporingsteam': {
      'title': 'Forensisch opsporingsteam'
    },
    'officier_van_justitie': {
      'title': 'Officier van Justitie'
    },
    'beslag_coordinator': {
      'title': 'Beslag coördinator (OM)'
    },
    'bewaarder': {
      'title': 'Bewaarder'
    },
    'digi': {
      'title': 'Digi'
    },
    'beslagene': {
      'title': 'Beslagene',
      'naam': 'Arnold Daniels',
      'geboorte_datum': '1981-08-22'
    },
    'ketenbeslaghuis': {
      'title': 'Ketenbeslaghuis'
    }
  },
  'events': [
    {
      'action': 'registratie',
      'response': 'ok',
      'actor': 'politie',
      'data': {
        'beslagene': {
          'naam': 'Arnold Daniels',
          'geboorte_datum': '1981-08-22'
        },
        'object': {
          'type': 'auto',
          'kenteken': '40-XPH-4',
          'merk': 'Suziki',
          'kleur': 'wit',
          'foto': 'http://image.autotrader.nl/media/135317866-medium.jpg'
        }
      },
      'version': '20170923'
    }
  ],
  'object': {
    'type': 'auto',
    'kenteken': '40-XPH-4',
    'merk': 'Suziki',
    'kleur': 'wit',
    'foto': 'http://image.autotrader.nl/media/135317866-medium.jpg'
  },
  'current': {}
};

@Injectable()
export class ProcessesProviderService {
  public process$: BehaviorSubject<Process>;

  constructor(private http: SecureHttpClientService) { }

  load(id: string): Observable<Process> {
    if (this.process$) {
      return this.process$;
    }

    // return this.http.get('http://app.docarama.com/service/flow/processes/' + id)
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
