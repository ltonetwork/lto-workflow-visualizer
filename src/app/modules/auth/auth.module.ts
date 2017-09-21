import { NgModule } from '@angular/core';
import { CookieModule } from 'ngx-cookie';

import { ATTACHED_SESSION_COOKIE_NAME, SESSION_COOKIE_NAME, SESSION_API } from './injection-tokens';
import { AuthService, SecureHttpClientService, SessionService } from './services';
import { AuthGuard, SessionResolveGuard } from './guards';

@NgModule({
  imports: [
    CookieModule.forChild()
  ],
  declarations: [],
  providers: [AuthService, SecureHttpClientService, SessionService,
    AuthGuard, SessionResolveGuard,
    {
      provide: SESSION_COOKIE_NAME,
      useValue: 'session'
    }, {
      provide: ATTACHED_SESSION_COOKIE_NAME,
      useValue: 'attachedsession'
    }, {
      provide: SESSION_API,
      useValue: 'http://app.docarama.com/service/iam/sessions'
    }, {
      provide: 'Window',
      useValue: window
    }]
})
export class AuthModule { }
