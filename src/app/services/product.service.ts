import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/Product';
import { productsEndpoints } from '../environment/environment';
import { ResponseInterface } from '../interfaces/ResponeInterface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<ResponseInterface<Product[]>> {
    return this.http.get<ResponseInterface<Product[]>>(
      productsEndpoints.getAllProducts
    );
  }
}
