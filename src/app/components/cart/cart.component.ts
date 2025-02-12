import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartsService } from '../../services/carts/carts.service';

@Component({
  selector: 'app-cart',
  imports: [FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartProducts: any[] = [];
  total: number = 0;
  success: boolean = false;
  private readonly cartsService = inject(CartsService);
  ngOnInit(): void {
    this.getProductsCart();
  }
  getProductsCart() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
    }
    this.getPriceTotal();
  }
  incrementAmount(index: number) {
    this.cartProducts[index].quantity++;
    this.getPriceTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  decrementAmount(index: number) {
    this.cartProducts[index].quantity--;
    this.getPriceTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  detectChange() {
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.getPriceTotal();
  }
  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1);
    this.getPriceTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  getPriceTotal() {
    this.total = 0;
    this.cartProducts.forEach((product) => {
      this.total += product.item.price * product.quantity;
    })
  }
  clearCart() {
    this.cartProducts = [];
    this.getPriceTotal();
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
  }
  addCartProducts() {
    let newProducts = this.cartProducts.map((item) => {
      return {productId: item.item.id, quantity: item.quantity}
    })
    const model = {
      userId: 5,
      date: new Date(),
      products: newProducts
    }
    this.cartsService.addNewCart(model).subscribe({
      next: (res) => {
        this.success = true;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
