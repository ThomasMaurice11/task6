import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getAllProducts(pageNumber:number,pageSize:number): Observable<any> {
     let querydata=`pageNumber=${pageNumber}&pageSize=${pageSize}`
    return this.http.get(`http://localhost:3002/products?${querydata}`);
  }
  getProductById(prodId: number): Observable<any> {
    return this.http.get(`http://localhost:3002/product/${prodId}`);
  }
}
