import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';

@Component({
  imports: [RouterLink, CurrencyPipe],
  selector: 'app-product-card',
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {
  readonly product = input.required<Product>();

  private readonly cart = inject(CartService);

  protected addToCart(): void {
    this.cart.addToCart(this.product());
  }
}
