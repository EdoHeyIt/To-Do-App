import { TestBed } from '@angular/core/testing';

import { UserPathService } from './user-path.service';

describe('UserPathService', () => {
  let service: UserPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
