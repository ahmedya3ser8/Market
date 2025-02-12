import { Routes } from '@angular/router';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'products', component: AllProductsComponent, title: 'products page'},
  {path: 'product/:id', component: ProductDetailsComponent, title: 'product page'},
  {path: 'cart', component: CartComponent, title: 'cart page'},
  {path: '**', component: NotFoundComponent, title: '404 page'},
];
