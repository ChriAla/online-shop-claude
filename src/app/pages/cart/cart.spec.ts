import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Cart } from './cart';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

const laptop: Product = { id: 1, name: 'Laptop', price: 899, image: '', description: '' };
const headphones: Product = { id: 3, name: 'Headphones', price: 99, image: '', description: '' };

describe('Cart', () => {
  let fixture: ComponentFixture<Cart>;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [Cart],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Cart);
  });

  it('shows a message when the cart is empty', async () => {
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Your cart is empty');
  });

  it('shows the items and the total', async () => {
    const cart = TestBed.inject(CartService);
    cart.addToCart(laptop);
    cart.addToCart(laptop);
    cart.addToCart(headphones);
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelectorAll('.cart-item').length).toBe(2);
    expect(fixture.nativeElement.querySelector('.cart-total').textContent).toContain('€1,897.00');
  });
});
