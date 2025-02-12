import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from '../../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClient: HttpClient) { }
  getAllProducts(): Observable<Iproduct[]> {
    return this.httpClient.get<Iproduct[]>(`https://fakestoreapi.com/products`);
  }
  getProductById(id: number): Observable<Iproduct> {
    return this.httpClient.get<Iproduct>(`https://fakestoreapi.com/products/${id}`);
  }
}
