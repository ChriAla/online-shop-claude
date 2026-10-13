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
  private readonly products = inject(ProductService).getProducts();

  protected readonly searchText = signal('');

  // Recalculated automatically every time searchText changes.
  protected readonly filteredProducts = computed(() => {
    const search = this.searchText().trim().toLowerCase();
    return this.products.filter((product) => product.name.toLowerCase().includes(search));
  });
}
