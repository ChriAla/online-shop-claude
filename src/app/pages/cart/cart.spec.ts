import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Cart } from './cart';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

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
    const products = TestBed.inject(ProductService);
    const cart = TestBed.inject(CartService);
    cart.addToCart(products.getProductById(1)!); // Laptop, 899
    cart.addToCart(products.getProductById(1)!);
    cart.addToCart(products.getProductById(3)!); // Headphones, 99
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelectorAll('.cart-item').length).toBe(2);
    expect(fixture.nativeElement.querySelector('.cart-total').textContent).toContain('€1,897.00');
  });
});
