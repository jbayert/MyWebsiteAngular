import { TestBed } from '@angular/core/testing';

import { OwnerGuard } from './owner.guard';

describe('OwnerGuardGuard', () => {
  let guard: OwnerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OwnerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
