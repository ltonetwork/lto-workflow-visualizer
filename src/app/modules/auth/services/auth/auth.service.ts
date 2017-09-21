import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { URLSearchParams } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/toPromise';
import { CookieService } from 'ngx-cookie';

import { Session, AttachedSession } from '@modules/auth/classes';
import { SessionService } from '@modules/auth/services/session/session.service';
import { SESSION_COOKIE_NAME, ATTACHED_SESSION_COOKIE_NAME } from '@modules/auth/injection-tokens';

@Injectable()
export class AuthService {
  // Readonly properties and getters only to prevent anyone from outside change sessions
  readonly authenticated$: Observable<boolean>;
  get session(): Session | undefined { return this._session; }
  set session(session: Session | undefined) {
    this._session = session;
    // Handle cookies
    if (session) {
      this.cookieService.put(this.sessionCookieName, session.id);
    } else {
      this.cookieService.remove(this.sessionCookieName);
    }
    // Emmit observable
    this.session$.next(session);
  }

  get attachedSession(): AttachedSession | undefined { return this._attachedSession; }
  set attachedSession(session: AttachedSession | undefined) {
    this._attachedSession = session;
    // Handle cookies
    if (session) {
      this.cookieService.put(this.attachedSessionCookieName, session.id);
    } else {
      this.cookieService.remove(this.attachedSessionCookieName);
    }
    // Emmit observable value
    this.attachedSession$.next(session);
  }

  public session$: ReplaySubject<Session | undefined>;
  public attachedSession$: ReplaySubject<AttachedSession | undefined>;
  private _session?: Session;
  private _attachedSession?: AttachedSession;

  constructor(
    private cookieService: CookieService,
    private sessionService: SessionService,
    @Inject(SESSION_COOKIE_NAME) private sessionCookieName: string,
    @Inject(ATTACHED_SESSION_COOKIE_NAME) private attachedSessionCookieName: string,
    @Inject('Window') private window: Window
  ) {
    this.session$ = new ReplaySubject<Session | undefined>();
    this.attachedSession$ = new ReplaySubject<AttachedSession | undefined>();

    this.authenticated$ = Observable.combineLatest(this.session$, this.attachedSession$).map((sessions: any[]) => {
      return Boolean(sessions[0] || sessions[1]);
    });
  }

  /**
   * Create session using credentials
   * @param email - email for loggin
   * @param password - password
   */
  login(email: string, password: string): Promise<Session> {
    return this.sessionService.create({ email, password })
      .toPromise()
      .then((session) => {
        this.session = session;
        return session;
      });
  }

  /**
   * Logout from the system and destroy all sessions.
   */
  logout(): Promise<void> {
    return Promise.all([
      this.session ? this.sessionService.destroy(this.session.id).toPromise() : Promise.resolve(null),
      this.attachedSession ? this.sessionService.destroy(this.attachedSession.id).toPromise() : Promise.resolve(null)
    ]).then(() => {
      this.session = void 0;
      this.attachedSession = void 0;
    });
  }

  /**
   * Restores main and attached sessions from cookies and url hash.
   * @description
   * We could have two sessions - main and attached. Information about them
   * stored in cookies or sometimes comes with url query params. This function
   * reads cookies and queryParams and restores sessions in proper order.
   */
  restoreSession(): Promise<void> {
    const mainSessionId = this.cookieService.get(this.sessionCookieName);
    const attachedSessionId = this.cookieService.get(this.attachedSessionCookieName);

    // Read "hash" queryParam from url and remove it after
    const sp = new URLSearchParams(this.getUrlQueryParams());
    const hash = sp.get('hash');
    sp.delete('hash');
    // Remove hash from URL query params without page reload
    if (hash) {
      this.window.history.replaceState({}, '', window.location.pathname + '?' + sp.toString());
    }

    // Resolve sessions from all possible sources
    return Promise.all([
      hash ? this.sessionService.one(hash).toPromise().catch(err => void 0) : Promise.resolve(void 0),
      mainSessionId ? this.sessionService.one(mainSessionId).toPromise().catch(err => void 0) : Promise.resolve(void 0),
      attachedSessionId ? this.sessionService.one(attachedSessionId).toPromise().catch(err => void 0) : Promise.resolve(void 0)
    ]).then((sessions) => {
      if (sessions[0]) {
        // It means that we were able to restore session from hash
        // Next step would be to figure out what kind of session it is
        if (sessions[0] instanceof Session) {
          this.session = sessions[0] as Session;
        } else {
          this.attachedSession = sessions[0] as AttachedSession;
        }
      }

      // Here we check if this.session setted already because
      // url hash has priority over session stored in cookies
      if (sessions[1]) {
        // If we laredy restire this.session from url hash
        // just use it because it has priority
        this.session = this.session || sessions[1] as Session;
      }

      // Last argument is AttachedSession
      if (sessions[2]) {
        // If it already restored from url hash use it
        // otherwise restore it from sessions array
        this.attachedSession = this.attachedSession || sessions[2] as AttachedSession;
      }

      // Update observables if sessions not resolved
      if (!this.session) {
        this.session = void 0;
      }

      if (!this.attachedSession) {
        this.attachedSession = void 0;
      }
    });
  }

  /**
   * Returns URL params after "?".
   * This function exists to make tests more easy
   */
  private getUrlQueryParams(): string {
    return this.window.location.search.slice(1);
  }
}
