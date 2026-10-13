import { Injectable, computed, effect, signal } from '@angular/core';
import { Product } from '../models/product';
import { CartItem } from '../models/cart-item';

const STORAGE_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartItems = signal<CartItem[]>(loadCart());

  // Components can read the cart but only change it through the methods below.
  readonly items = this.cartItems.asReadonly();
  readonly count = computed(() => this.items().reduce((total, item) => total + item.quantity, 0));
  readonly total = computed(() =>
    this.items().reduce((total, item) => total + item.product.price * item.quantity, 0),
  );

  constructor() {
    // Runs every time the cart changes, so the cart survives a page refresh.
    effect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cartItems())));
  }

  addToCart(product: Product): void {
    if (this.cartItems().some((item) => item.product.id === product.id)) {
      this.increaseQuantity(product);
    } else {
      this.cartItems.update((items) => [...items, { product, quantity: 1 }]);
    }
  }

  increaseQuantity(product: Product): void {
    this.changeQuantity(product, 1);
  }

  decreaseQuantity(product: Product): void {
    this.changeQuantity(product, -1);
  }

  removeFromCart(product: Product): void {
    this.cartItems.update((items) => items.filter((item) => item.product.id !== product.id));
  }

  // Signals only notice new values, so we build a new array instead of editing the old one.
  // Items whose quantity drops to 0 are removed from the cart.
  private changeQuantity(product: Product, change: number): void {
    this.cartItems.update((items) =>
      items
        .map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + change } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }
}

function loadCart(): CartItem[] {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}
