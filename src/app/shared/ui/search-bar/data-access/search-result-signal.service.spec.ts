import { TestBed } from '@angular/core/testing';

import { SearchResultSignalService } from './search-result-signal.service';

describe('SearchResultSignalService', () => {
  let service: SearchResultSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchResultSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
