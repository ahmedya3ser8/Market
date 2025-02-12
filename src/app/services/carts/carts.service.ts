import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  constructor(private httpClient:HttpClient) { }
  addNewCart(model: any): Observable<any> {
    return this.httpClient.post(`https://fakestoreapi.com/carts`, model);
  }
}
