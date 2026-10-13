import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../models/product';

const laptop: Product = { id: 1, name: 'Laptop', price: 899, image: '', description: '' };
const phone: Product = { id: 2, name: 'Smartphone', price: 599, image: '', description: '' };

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    localStorage.clear();
    service = TestBed.inject(CartService);
  });

  it('adds a new product with quantity 1', () => {
    service.addToCart(laptop);

    expect(service.items()).toEqual([{ product: laptop, quantity: 1 }]);
  });

  it('increases the quantity when the same product is added again', () => {
    service.addToCart(laptop);
    service.addToCart(laptop);

    expect(service.items()).toEqual([{ product: laptop, quantity: 2 }]);
  });

  it('removes a product when its quantity drops to 0', () => {
    service.addToCart(laptop);
    service.decreaseQuantity(laptop);

    expect(service.items()).toEqual([]);
  });

  it('removes a product completely', () => {
    service.addToCart(laptop);
    service.increaseQuantity(laptop);
    service.removeFromCart(laptop);

    expect(service.items()).toEqual([]);
  });

  it('calculates the item count and the total price', () => {
    service.addToCart(laptop);
    service.addToCart(phone);
    service.increaseQuantity(phone);

    expect(service.count()).toBe(3);
    expect(service.total()).toBe(899 + 2 * 599);
  });

  it('saves the cart in localStorage', () => {
    service.addToCart(laptop);
    TestBed.tick();

    expect(JSON.parse(localStorage.getItem('cart') ?? '')).toEqual([
      { product: laptop, quantity: 1 },
    ]);
  });

  it('loads a saved cart when the app starts', () => {
    localStorage.setItem('cart', JSON.stringify([{ product: laptop, quantity: 2 }]));
    TestBed.resetTestingModule();

    expect(TestBed.inject(CartService).count()).toBe(2);
  });
});
