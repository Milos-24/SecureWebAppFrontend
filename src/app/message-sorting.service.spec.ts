import { TestBed } from '@angular/core/testing';

import { MessageSortingService } from './message-sorting.service';

describe('MessageSortingService', () => {
  let service: MessageSortingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageSortingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
