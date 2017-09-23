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
      'title': 'Politie',
      'id': 'politie'
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
    'transport': {
      'title': 'Transport',
      'id': 'transport'
    },
    'bewaarder': {
      'title': 'Bewaarder domeinen'
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
      'title': 'Ketenbeslaghuis',
      'id': 'ketenbeslaghuis'
    }
  },
  'events': [
    {
      'action': 'registratie',
      'response': 'ok',
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
      'timestamp': '2017-09-22T14:51:00+0200',
      'version': '20170923',
      'actor': 'politie',
      'title': 'Registratie van beslag'
    },
    {
      'action': 'transport',
      'response': 'ok',
      'data': {
        'locatie': {
          'lat': '52.0661263',
          'lng': '4.356196'
        }
      },
      'timestamp': '2017-09-22T15:19:00+0200',
      'version': '20170923',
      'actor': 'transport',
      'title': 'De transport heeft het object is ontvangen'
    },
    {
      'action': 'ketenbeslaghuis_ontvangst',
      'response': 'ok',
      'data': {
        'locatie': {
          'lat': '52.0463866',
          'lng': '4.2509162'
        }
      },
      'timestamp': '2017-09-22T15:45:00+0200',
      'version': '20170923',
      'actor': 'ketenbeslaghuis',
      'title': 'Het ketenhuis heeft het object ontvangen'
    }
  ],
  'object': {
    'type': 'auto',
    'kenteken': '40-XPH-4',
    'merk': 'Suziki',
    'kleur': 'wit',
    'foto': 'http://image.autotrader.nl/media/135317866-medium.jpg'
  },
  'locatie': {
    'lat': '52.0463866',
    'lng': '4.2509162'
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
