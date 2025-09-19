import { TestBed } from '@angular/core/testing';

import { ActiveOffersService } from './active-offers.service';
import { provideHttpClient } from '@angular/common/http';
import { Done } from 'mocha';

describe('GetProductsService', () => {
  let service: ActiveOffersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActiveOffersService, provideHttpClient()],
    });
    service = TestBed.inject(ActiveOffersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return value', (done: Done) => {
    service.getActiveOffers().subscribe((products) => {
      expect(products?.length).toBeGreaterThanOrEqual(0);
      done();
    });
  });
});
