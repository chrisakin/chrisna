import { TestBed } from '@angular/core/testing';

import { CanENterTabsPageGuard } from './can-enter-tabs-page.guard';

describe('CanENterTabsPageGuard', () => {
  let guard: CanENterTabsPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanENterTabsPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
