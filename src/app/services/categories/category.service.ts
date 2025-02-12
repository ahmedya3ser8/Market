import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient) { }
  getAllCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(`https://fakestoreapi.com/products/categories`)
  }
  getCategory(category: string): Observable<any> {
    return this.httpClient.get<any>(`https://fakestoreapi.com/products/category/${category}`);
  }
}
