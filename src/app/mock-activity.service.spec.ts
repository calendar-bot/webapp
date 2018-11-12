import { TestBed } from '@angular/core/testing';

import { MockActivityService } from './mock-activity.service';

describe('MockActivityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockActivityService = TestBed.get(MockActivityService);
    expect(service).toBeTruthy();
  });
});
