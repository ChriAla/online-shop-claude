import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Loads the products from the backend API (which reads them from Azure SQL).
  // The request is made once, the first time a page uses the service, and the result is shared.
  readonly products = httpResource<Product[]>(() => `${environment.apiUrl}/products`, {
    defaultValue: [],
  });
}
