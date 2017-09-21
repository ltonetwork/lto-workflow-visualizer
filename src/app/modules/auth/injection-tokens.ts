import { InjectionToken } from '@angular/core';

export const SESSION_COOKIE_NAME = new InjectionToken<string>('Session cookie came');
export const ATTACHED_SESSION_COOKIE_NAME = new InjectionToken<string>('Attached session cookie name');
export const SESSION_API = new InjectionToken<string>('Session API endpoint');
