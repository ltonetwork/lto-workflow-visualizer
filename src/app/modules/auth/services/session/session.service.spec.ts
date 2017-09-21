import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SESSION_API } from '@modules/auth/injection-tokens';
import { SessionService } from './session.service';
import { Session, AttachedSession } from '@modules/auth/classes';

describe('SessionService', () => {
  const sessions: any = {
    '/session-api/main_session': {
      id: 'main_session_id'
    },
    '/session-api/attached_session': {
      id: 'attached_session_id',
      action: { state: 'test_state' }
    }
  };

  beforeEach(() => {
    const httpClientStub = {
      get: (url: string) => Observable.of(sessions[url]),
      post: jasmine.createSpy('post').and.returnValue(Observable.of(sessions['/session-api/main_session'])),
      delete: jasmine.createSpy('delete').and.returnValue(Observable.of(null))
    };

    TestBed.configureTestingModule({
      providers: [SessionService,
        { provide: HttpClient, useValue: httpClientStub },
        { provide: SESSION_API, useValue: '/session-api' }
      ]
    });
  });

  it('should be created', inject([SessionService], (service: SessionService) => {
    expect(service).toBeTruthy();
  }));
  describe('one()', () => {
    it('should create main session if no "action" field present in response (async)', async(
      inject([SessionService], (service: SessionService) => {
        service.one('main_session').subscribe((session) => {
          expect(session instanceof Session).toBe(true);
        });
      })
    ));

    it('should create attached session if "action" field present in response (async)', async(
      inject([SessionService], (service: SessionService) => {
        service.one('attached_session').subscribe((session) => {
          expect(session instanceof AttachedSession).toBe(true);
        });
      })
    ));
  });

  describe('create()', () => {
    it('should assign params to credentials if present (async)', async(
      inject([SessionService, HttpClient], (service: SessionService, httpClient: HttpClient) => {
        service.create({ email: 'test@test.com', password: 'test' }, { forgotpassword: true })
          .subscribe((session) => {
            expect(httpClient.post).toHaveBeenCalledWith(
              '/session-api',
              { email: 'test@test.com', password: 'test', forgotpassword: true }
            );
          });
      })
    ));
  });

  describe('destroy()', () => {
    it('should return main session if no "action" field present in response (async)', async(
      inject([SessionService, HttpClient], (service: SessionService, httpClient: any) => {
        service.destroy('test_session').subscribe(() => {
          expect((httpClient.delete as jasmine.Spy)).toHaveBeenCalled();
        });
      })
    ));
  });
});
