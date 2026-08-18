import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Pagination } from '../../shared/models/pagination';
import { Product } from '../../shared/models/product';
import { map, Observable } from 'rxjs';

@Service()
export class ShopService {
  baseUrl = 'http://localhost:5001/api/';
  private http = inject(HttpClient);

  getProducts(): Observable<Pagination<Product>> {
    return this.http.get<Pagination<Product>>(this.baseUrl + 'products');
  }
}
