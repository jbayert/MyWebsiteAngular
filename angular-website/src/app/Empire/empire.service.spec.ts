import { TestBed } from '@angular/core/testing';

import { EmpireService } from './empire.service';

describe('EmpireService', () => {
  let service: EmpireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
