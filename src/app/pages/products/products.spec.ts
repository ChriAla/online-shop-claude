import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Products } from './products';
import { Product } from '../../models/product';
import { environment } from '../../../environments/environment';

const products: Product[] = [
  { id: 1, name: 'Backpack', price: 109.95, image: '', description: '' },
  { id: 2, name: 'T-Shirt', price: 22.3, image: '', description: '' },
  { id: 3, name: 'Jacket', price: 55.99, image: '', description: '' },
];

describe('Products', () => {
  let fixture: ComponentFixture<Products>;
  let httpTesting: HttpTestingController;

  function shownProducts(): string[] {
    const titles: NodeListOf<HTMLElement> =
      fixture.nativeElement.querySelectorAll('app-product-card h2');
    return Array.from(titles, (title) => title.textContent?.trim() ?? '');
  }

  // Plays the part of the backend: answers the request the page made.
  async function respondWith(body: Product[]): Promise<void> {
    httpTesting.expectOne(`${environment.apiUrl}/products`).flush(body);
    await fixture.whenStable();
  }

  async function search(text: string): Promise<void> {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = text;
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Products],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(Products);
    TestBed.tick(); // shows the page and sends the request for the products
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('shows a loading message until the products arrive', async () => {
    expect(fixture.nativeElement.textContent).toContain('Loading products...');

    await respondWith(products);

    expect(fixture.nativeElement.textContent).not.toContain('Loading products...');
  });

  it('shows the products from the API', async () => {
    await respondWith(products);

    expect(shownProducts()).toEqual(['Backpack', 'T-Shirt', 'Jacket']);
  });

  it('shows an error message when the API fails', async () => {
    httpTesting
      .expectOne(`${environment.apiUrl}/products`)
      .flush('Database connection failed', { status: 500, statusText: 'Server Error' });
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Could not load the products');
  });

  it('filters the list while typing', async () => {
    await respondWith(products);
    await search('jack');

    expect(shownProducts()).toEqual(['Jacket']);
  });

  it('shows a message when nothing matches', async () => {
    await respondWith(products);
    await search('tablet');

    expect(shownProducts()).toEqual([]);
    expect(fixture.nativeElement.textContent).toContain('No products found for "tablet"');
  });
});
