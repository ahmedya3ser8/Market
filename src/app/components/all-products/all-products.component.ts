import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Iproduct } from '../../models/iproduct';
import { ProductComponent } from "../product/product.component";
import { SelectComponent } from "../select/select.component";
import { SpinnerComponent } from "../spinner/spinner.component";
import { CategoryService } from '../../services/categories/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-products',
  imports: [ProductComponent, SelectComponent, SpinnerComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent implements OnInit, OnDestroy {
  products!: Iproduct[];
  categories!: string[];
  subscriptions: Subscription[] = [];
  cartProducts: any[] = [];
  loading: boolean = false;
  private readonly productsService = inject(ProductsService);
  private readonly categoryService = inject(CategoryService);
  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }
  getProducts() {
    this.loading = true;
    this.subscriptions.push(this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    }))
  }
  getCategories() {
    this.loading = true;
    this.subscriptions.push(this.categoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    }))
  }
  filterCategories(e: any) {
    let value = e.target.value;
    (value == 'all') ? this.getProducts() : this.getProductsCategory(value);
  }
  getProductsCategory(category: string) {
    this.loading = true;
    this.subscriptions.push(this.categoryService.getCategory(category).subscribe({
      next: (res) => {
        this.products = res;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    }))
  }
  addToCart(event: any) {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      let productExists = this.cartProducts.find((item) => item.item.id == event.item.id);
      if (productExists) {
        alert('product already in cart');
      } else {
        this.cartProducts.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    })
  }
}
