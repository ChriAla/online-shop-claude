import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [ProductCard, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  protected readonly products = inject(ProductService).products;

  protected readonly searchText = signal('');

  // Recalculated automatically when the products arrive or when searchText changes.
  protected readonly filteredProducts = computed(() => {
    const search = this.searchText().trim().toLowerCase();
    const products = this.products.hasValue() ? this.products.value() : [];
    return products.filter((product) => product.name.toLowerCase().includes(search));
  });
}
