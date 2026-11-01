import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { userLoggedGuardGuard } from './user-logged-guard-guard';

describe('userLoggedGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => userLoggedGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
