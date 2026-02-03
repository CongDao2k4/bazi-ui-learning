import { TestBed } from '@angular/core/testing';

import { LasoService } from './laso-service';

describe('LasoService', () => {
  let service: LasoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LasoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
