import { Component, computed, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  imports: [CurrencyPipe, RouterLink],
  selector: 'app-product-details',
  styleUrl: './product-details.css',
  templateUrl: './product-details.html',
})
export class ProductDetails {
  // The router fills this from the :id in the URL (see withComponentInputBinding in app.config.ts).
  readonly id = input.required<string>();

  protected readonly products = inject(ProductService).products;
  private readonly cart = inject(CartService);

  protected readonly product = computed(() => {
    const id = Number(this.id());
    const products = this.products.hasValue() ? this.products.value() : [];
    return products.find((product) => product.id === id);
  });

  protected addToCart(): void {
    const product = this.product();
    if (product) {
      this.cart.addToCart(product);
    }
  }
}
