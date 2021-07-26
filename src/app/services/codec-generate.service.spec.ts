import { TestBed } from '@angular/core/testing';

import { CodecGenerateService } from './codec-generate.service';

describe('CodecGenerateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodecGenerateService = TestBed.get(CodecGenerateService);
    expect(service).toBeTruthy();
  });
});
