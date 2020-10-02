import { TestBed } from '@angular/core/testing';

import { CanAdminGuard } from './can-admin.guard';

describe('CanAdminGuard', () => {
  let guard: CanAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
