import { TestBed } from '@angular/core/testing';

import { HohService } from './hoh.service';

describe('HohService', () => {
  let service: HohService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HohService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
