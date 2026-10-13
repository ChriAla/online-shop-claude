import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { Cart } from './pages/cart/cart';
import { ProductDetails } from './pages/product-details/product-details';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'MyShop',
  },
  {
    path: 'products',
    component: Products,
    title: 'Products | MyShop',
  },
  {
    path: 'products/:id',
    component: ProductDetails,
    title: 'Product details | MyShop',
  },
  {
    path: 'cart',
    component: Cart,
    title: 'Cart | MyShop',
  },
  {
    // Any unknown URL goes back to the home page.
    path: '**',
    redirectTo: '',
  },
];
