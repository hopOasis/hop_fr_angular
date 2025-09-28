import { TestBed } from '@angular/core/testing';

import { Is18ConfirmedService } from './is-18-confirmed.service';

describe('Is18ConfirmedService', () => {
  let service: Is18ConfirmedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Is18ConfirmedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
