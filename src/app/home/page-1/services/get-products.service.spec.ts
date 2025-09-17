import { TestBed } from '@angular/core/testing';

import { GetProductsService } from './get-products.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ProductDescription } from '../../../catalog/data-access/models/product-description.model';
import { Done } from 'mocha';

describe('GetProductsService', () => {
  let service: GetProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetProductsService, provideHttpClient()],
    });
    service = TestBed.inject(GetProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return value', (done: Done) => {
    service.getProducts().subscribe((products) => {
      expect(products?.length).toBeGreaterThanOrEqual(0);
      done();
    });
  });
});
