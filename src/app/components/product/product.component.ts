import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Iproduct } from '../../models/iproduct';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input({required: true}) product!: Iproduct;
  clicked: boolean = false;
  amount: number = 0;
  @Output() item: EventEmitter<any> = new EventEmitter();
  private readonly router = inject(Router);
  goToDetails(id: number) {
    this.router.navigateByUrl(`/product/${id}`);
  }
  add() {
    this.item.emit({item: this.product, quantity: this.amount});
  }
}
