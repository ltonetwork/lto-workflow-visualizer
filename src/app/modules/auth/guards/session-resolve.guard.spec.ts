import { TestBed, async, inject } from '@angular/core/testing';

import { SessionResolveGuard } from './session-resolve.guard';

describe('SessionResolveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionResolveGuard]
    });
  });

  it('should ...', inject([SessionResolveGuard], (guard: SessionResolveGuard) => {
    expect(guard).toBeTruthy();
  }));
});
