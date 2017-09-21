import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpRequest, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth/auth.service';

export type HttpObserve = 'body' | 'events' | 'response';

@Injectable()
export class SecureHttpClientService extends HttpClient {

  constructor(handler: HttpHandler, private auth: AuthService) {
    super(handler);
  }

  request(first: string | HttpRequest<any>, url?: string, options: {
    body?: any,
    headers?: HttpHeaders,
    observe?: HttpObserve,
    params?: HttpParams,
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean,
  } = {}): Observable<any> {
    if (this.auth.session === null && this.auth.attachedSession === null) {
      throw new Error('You are not authorized!');
    }
    const sessionId = this.auth.session ? this.auth.session.id : '';
    const attachedSessionId = this.auth.attachedSession ? this.auth.attachedSession.id : '';
    let headers = options.headers || new HttpHeaders();

    if (!sessionId && !attachedSessionId) {
      throw new Error('You are not authorized!');
    }

    headers = headers.set('X-Session', attachedSessionId || sessionId);
    options.headers = headers;
    return super.request(first as any, url as string, options);
  }
}
