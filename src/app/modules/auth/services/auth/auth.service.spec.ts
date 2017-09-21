import { TestBed, inject, async, fakeAsync } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

import { AuthService } from './auth.service';
import { SessionService } from '@modules/auth/services';
import { Session, AttachedSession } from '@modules/auth/classes';
import { SESSION_COOKIE_NAME, ATTACHED_SESSION_COOKIE_NAME } from '@modules/auth/injection-tokens';

describe('AuthService', () => {
  let sessions: any;
  let cookies: any;

  beforeEach(() => {
    sessions = {
      main_session: new Session({ id: 'session_id', user: { id: 'test_user_id', email: 'user@test.com' } }),
      attached_session: new AttachedSession({ id: 'a_session_id', party: {
        name: 'test_party',
        email: 'party@test.com'
      } })
    };

    cookies = {
      main_session: 'main_session',
      attached_session: 'attached_session'
    };

    const cookieServiceStub = {
      get: (name: string) => cookies[name] || '',
      put: (name: string, value: string) => null,
      remove: jasmine.createSpy('remove')
    };

    const sessionServiceStub = {
      one: (id: string) => new Observable<any>((subscriber) => {
        if (sessions[id]) {
          subscriber.next(sessions[id]);
          subscriber.complete();
        } else {
          subscriber.error();
        }
      }),
      create: (credentials: any) => Observable.of({ id: 'test_session_id' }),
      destroy: jasmine.createSpy('destroy').and.returnValue(Observable.of(null))
    };

    const fakeWindow = {
      location: { search: '', pathname: '' },
      history: { replaceState: () => null }
    };

    TestBed.configureTestingModule({
      providers: [AuthService,
        { provide: CookieService, useValue: cookieServiceStub },
        { provide: SessionService, useValue: sessionServiceStub },
        { provide: SESSION_COOKIE_NAME, useValue: 'main_session' },
        { provide: ATTACHED_SESSION_COOKIE_NAME, useValue: 'attached_session' },
        { provide: 'Window', useValue: fakeWindow }
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  describe('authenticated$', () => {
    it('should be not authenticated if no session id present(async)', fakeAsync(
      inject([AuthService], (service: AuthService) => {
        // Return nothing from cookies
        cookies = {};
        service.restoreSession();
        service.authenticated$.subscribe(status => expect(status).toBe(false));
      })
    ));

    it('should be authenticated if only [main]session cookie present (async)', async(inject([AuthService], (service: AuthService) => {
      sessions.attached_session = null;
      service.restoreSession();
      service.authenticated$.subscribe(status => expect(status).toBe(true));
    })));

    it('should be authenticated if only [attached]session cookie present (async)', async(inject([AuthService], (service: AuthService) => {
      sessions.main = null;
      service.restoreSession();
      service.authenticated$.subscribe(status => expect(status).toBe(true));
    })));

    it('should be authenticated if url [main]"hash" param present (async)', async(
      inject([AuthService, 'Window'], (service: AuthService, window: any) => {
        // Return nothing from cookies
        cookies = {};
        window['location'] = { search: '?hash=main_session', pathname: '' };
        service.restoreSession();
        service.authenticated$.subscribe(status => expect(status).toBe(true));
      })
    ));

    it('should be authenticated if url [attached]"hash" param present (async)', async(
      inject([AuthService, 'Window'], (service: AuthService, window: any) => {
        // Return nothing from cookies
        cookies = {};
        window['location'] = { search: '?hash=attached_session', pathname: '' };
        service.restoreSession();
        service.authenticated$.subscribe(status => expect(status).toBe(true));
      })
    ));

    it('should be not authenticated if invalid [main]session cookie is present (async)',
      async(inject([AuthService], (service: AuthService) => {
        cookies = { main_session: 'invalid' };
        service.restoreSession();
        service.authenticated$.subscribe(status => expect(status).toBe(false));
      }))
    );

    it('should be not authenticated if invalid [attached]session cookie is present (async)',
      async(inject([AuthService], (service: AuthService) => {
        cookies = { attached_session: 'invalid' };
        service.restoreSession();
        service.authenticated$.subscribe(status => expect(status).toBe(false));
      }))
    );

    it('should be authenticated with invalid main session and valid attached (async)',
      async(inject([AuthService], (service: AuthService) => {
        cookies['main_session'] = 'invalid';
        service.restoreSession();
        service.authenticated$.subscribe(status => expect(status).toBe(true));
      }))
    );

    it('should be authenticated with valid main session and invalid attached (async)',
      async(inject([AuthService], (service: AuthService) => {
        cookies.attached_session = 'invalid';
        service.restoreSession();
        service.authenticated$.subscribe(status => expect(status).toBe(true));
      }))
    );
  });

  describe('restoreSession()', () => {
    it('should prioritize main session id from url hash over cookie (async)',
      async(inject([AuthService, 'Window'], (service: AuthService, window: any) => {
        sessions['hash_session'] = new Session({ id: 'session_from_hash' });
        window['location'] = { search: '?hash=hash_session', pathname: '' };
        service.restoreSession();
        service.session$.subscribe((session: Session) => expect(session.id).toBe('session_from_hash'));
      }))
    );

    it('should prioritize attached session id from url hash over cookie (async)',
      async(inject([AuthService, 'Window'], (service: AuthService, window: any) => {
        sessions['hash_session'] = new AttachedSession({ id: 'attached_session_from_hash' });
        window['location'] = { search: '?hash=hash_session', pathname: '' };
        service.restoreSession();
        service.attachedSession$.subscribe((session: AttachedSession) => expect(session.id).toBe('attached_session_from_hash'));
      }))
    );

    it('should use session from cookies if hash is invalid (async)',
      async(inject([AuthService, 'Window'], (service: AuthService, window: any) => {
        window['location'] = { search: '?hash=hash_session', pathname: '' };
        service.restoreSession();
        service.session$.subscribe((session: Session) => expect(session.id).toBe('session_id'));
        service.attachedSession$.subscribe((session: AttachedSession) => expect(session.id).toBe('a_session_id'));
      }))
    );
  });

  describe('login()', () => {
    beforeEach(inject([AuthService], (authService: AuthService) => {
      // Make sure that we are not legged in
      cookies = {};
      authService.restoreSession();
    }));

    it('should login (async)',
      async(inject([AuthService], (service: AuthService) => {
        service.login('test@test.com', 'test_password');
        service.authenticated$.subscribe((status) => expect(status).toBe(true));
      }))
    );

    it('should not login with invalid credentials (async)',
      async(inject([AuthService, SessionService], (service: AuthService, sessionService: SessionService) => {
        sessionService.create = () => Observable.throw('Invalid');
        service.login('invalid@test.com', 'invlid_pass').catch((err) => {});
        service.authenticated$.subscribe((status) => expect(status).toBe(false));
      }))
    );
  });

  describe('logout()', () => {
    beforeEach(async(inject([AuthService], (service: AuthService) => {
      service.restoreSession();
    })));

    it('should destroy all sessions', async(
      inject([AuthService, SessionService], (service: AuthService, sessionService: SessionService) => {
        service.logout().then(() => {
          expect(sessionService.destroy).toHaveBeenCalledTimes(2);
          expect(sessionService.destroy).toHaveBeenCalledWith('session_id');
          expect(sessionService.destroy).toHaveBeenCalledWith('a_session_id');
        });
      })
    ));

    it('should remove all cookies', async(
      inject([AuthService, CookieService], (service: AuthService, cookieService: CookieService) => {
        service.logout().then(() => {
          expect(cookieService.remove).toHaveBeenCalledWith('main_session');
          expect(cookieService.remove).toHaveBeenCalledWith('attached_session');
        });
      })
    ));
  });
});
