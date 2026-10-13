import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Navbar } from './navbar';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

describe('Navbar', () => {
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [Navbar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    await fixture.whenStable();
  });

  it('shows how many items are in the cart', async () => {
    expect(fixture.nativeElement.textContent).toContain('Cart (0)');

    const laptop = TestBed.inject(ProductService).getProductById(1)!;
    const cart = TestBed.inject(CartService);
    cart.addToCart(laptop);
    cart.addToCart(laptop);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Cart (2)');
  });
});
