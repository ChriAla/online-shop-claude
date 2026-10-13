import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    service = TestBed.inject(ProductService);
  });

  it('returns the three products', () => {
    const names = service.getProducts().map((product) => product.name);

    expect(names).toEqual(['Laptop', 'Smartphone', 'Headphones']);
  });

  it('finds a product by id', () => {
    expect(service.getProductById(2)?.name).toBe('Smartphone');
    expect(service.getProductById(99)).toBeUndefined();
  });
});
