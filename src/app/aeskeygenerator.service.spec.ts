import { TestBed } from '@angular/core/testing';

import { AeskeygeneratorService } from './aeskeygenerator.service';

describe('AeskeygeneratorService', () => {
  let service: AeskeygeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AeskeygeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
