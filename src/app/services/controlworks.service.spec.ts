import { TestBed } from '@angular/core/testing';

import { ControlworksService } from './controlworks.service';

describe('ControlworksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ControlworksService = TestBed.get(ControlworksService);
    expect(service).toBeTruthy();
  });
});
