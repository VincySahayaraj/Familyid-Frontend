import { TestBed } from '@angular/core/testing';

import { RetakeService } from './retake.service';

describe('RetakeService', () => {
  let service: RetakeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
