import { TestBed } from '@angular/core/testing';

import { RouteAssistanceService } from './route-assistance.service';

describe('RouteAssistanceService', () => {
  let service: RouteAssistanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteAssistanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
