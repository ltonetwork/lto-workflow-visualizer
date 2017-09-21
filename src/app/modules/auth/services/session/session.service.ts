import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Session, AttachedSession } from '@modules/auth/classes';
import { SESSION_API } from '@modules/auth/injection-tokens';

@Injectable()
export class SessionService {

  constructor(
    public httpClient: HttpClient,
    @Inject(SESSION_API) public sessionApiUrl: string
  ) { }

  /**
   * Retreive session information
   * @description
   * Lealthings has two types of session - main and attached.
   * You can identify them by 'action' property, only attached session have it.
   * @param id - session id
   */
  one(id: string): Observable<Session | AttachedSession> {
    return this.httpClient.get(this.sessionApiUrl + '/' + id)
      .map((rawSession: any) => rawSession['action'] ? new AttachedSession(rawSession) : new Session(rawSession));
  }

  /**
   * Create new session
   * @param credentials - login credentials
   * @param params - additional params (forgotPassword)
   */
  create(credentials: {email: string, password?: string}, params?: { forgotpassword: boolean; }): Observable<Session> {
    const data = Object.assign({}, credentials, params);
    return this.httpClient.post(this.sessionApiUrl, data)
      .map(response => new Session(response));
  }

  /**
   * Destroy session on backend
   * @param id - session id
   */
  destroy(id: string): Observable<null> {
    return this.httpClient.delete(this.sessionApiUrl + '/' + id)
      .map((rawSession: any) => null);
  }
}
