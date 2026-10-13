import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ProductDetails } from './product-details';
import { Product } from '../../models/product';
import { environment } from '../../../environments/environment';

const products: Product[] = [
  { id: 1, name: 'Backpack', price: 109.95, image: '', description: '' },
  { id: 2, name: 'T-Shirt', price: 22.3, image: '', description: '' },
];

describe('ProductDetails', () => {
  let fixture: ComponentFixture<ProductDetails>;
  let httpTesting: HttpTestingController;

  // Opens the page for this id and answers the request for the products.
  async function showProduct(id: string): Promise<void> {
    fixture.componentRef.setInput('id', id);
    TestBed.tick();
    httpTesting.expectOne(`${environment.apiUrl}/products`).flush(products);
    await fixture.whenStable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetails],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ProductDetails);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('shows the product with the id from the URL', async () => {
    await showProduct('2');

    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('T-Shirt');
  });

  it('shows a message when the product does not exist', async () => {
    await showProduct('99');

    expect(fixture.nativeElement.textContent).toContain('this product does not exist');
  });
});
