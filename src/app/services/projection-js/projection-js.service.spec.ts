import { TestBed, inject } from '@angular/core/testing';

import { ProjectionJsService } from './projection-js.service';

describe('ProjectionJsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectionJsService]
    });
  });

  it('should be created', inject([ProjectionJsService], (service: ProjectionJsService) => {
    expect(service).toBeTruthy();
  }));
});
