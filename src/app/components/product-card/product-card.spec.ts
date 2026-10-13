import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProductCard } from './product-card';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

const laptop: Product = {
  id: 1,
  name: 'Laptop',
  price: 899,
  image: '/images/laptop.jpg',
  description: 'Powerful laptop for everyday use.',
};

describe('ProductCard', () => {
  let fixture: ComponentFixture<ProductCard>;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [ProductCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    fixture.componentRef.setInput('product', laptop);
    await fixture.whenStable();
  });

  it('shows the product name and price', () => {
    const text = fixture.nativeElement.textContent;

    expect(text).toContain('Laptop');
    expect(text).toContain('€899.00');
  });

  it('adds the product to the cart', () => {
    fixture.nativeElement.querySelector('button').click();

    expect(TestBed.inject(CartService).items()).toEqual([{ product: laptop, quantity: 1 }]);
  });
});
