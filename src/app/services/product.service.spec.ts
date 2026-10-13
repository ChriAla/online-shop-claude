import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';

const products: Product[] = [
  { id: 1, name: 'Backpack', price: 109.95, image: '', description: '' },
  { id: 2, name: 'T-Shirt', price: 22.3, image: '', description: '' },
];

describe('ProductService', () => {
  let service: ProductService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // provideHttpClientTesting replaces the real network with a fake one we control.
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProductService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify(); // fails if a request was made that the test did not expect
  });

  it('loads the products from the API', async () => {
    TestBed.tick(); // lets the service send its request

    httpTesting.expectOne(`${environment.apiUrl}/products`).flush(products);
    await TestBed.inject(ApplicationRef).whenStable();

    expect(service.products.value()).toEqual(products);
  });

  it('reports an error when the API fails', async () => {
    TestBed.tick();

    httpTesting
      .expectOne(`${environment.apiUrl}/products`)
      .flush('Database connection failed', { status: 500, statusText: 'Server Error' });
    await TestBed.inject(ApplicationRef).whenStable();

    expect(service.products.error()).toBeTruthy();
  });
});
