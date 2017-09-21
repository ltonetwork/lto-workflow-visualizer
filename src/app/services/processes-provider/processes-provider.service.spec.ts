import { TestBed, inject } from '@angular/core/testing';

import { ProcessesProviderService } from './processes-provider.service';

describe('ProcessesProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessesProviderService]
    });
  });

  it('should be created', inject([ProcessesProviderService], (service: ProcessesProviderService) => {
    expect(service).toBeTruthy();
  }));
});
