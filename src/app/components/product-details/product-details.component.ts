import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { Iproduct } from '../../models/iproduct';
import { SpinnerComponent } from "../spinner/spinner.component";
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [SpinnerComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  currentId: number = 0;
  loading: boolean = false;
  product: Iproduct = {} as Iproduct;
  private readonly productsService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly location = inject(Location);
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.currentId = Number(paramMap.get('id'));
      this.getProduct();
    })
  }
  getProduct() {
    this.loading = true;
    this.productsService.getProductById(this.currentId).subscribe({
      next: (res) => {
        this.product = res;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      }
    })
  }
  backTo() {
    this.location.back();
  }
}
