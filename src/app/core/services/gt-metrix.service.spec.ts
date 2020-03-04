import { TestBed } from '@angular/core/testing';

import { GtMetrixService } from './gt-metrix.service';

describe('GtMetrixService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GtMetrixService = TestBed.get(GtMetrixService);
    expect(service).toBeTruthy();
  });
});
