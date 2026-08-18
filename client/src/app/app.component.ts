import { AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClient } from '@angular/common/http';
import { Product } from './shared/models/product';
import { Pagination } from './shared/models/pagination';
import { firstValueFrom, Observable } from 'rxjs';
import { AsyncPipe, NgForOf } from '@angular/common';
import { ShopService } from './core/services/shop.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, AsyncPipe, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  baseUrl = 'http://localhost:5001/api/';
  private shopService = inject(ShopService);
  title = 'client';
  products: Product[] = [];
  paginations: Pagination<Product> = {
    pageIndex: 1,
    pageSize: 10,
    count: 0,
    data: [],
  };

  /*  ngOnInit() {
    thise.getProducts();
  }

  async getProducts() {
    try {
      const products = await firstValueFrom<any>(this.http.get(this.baseUrl + 'products'));
      this.products = products;
      console.log(this.products);
    } catch (error) {
      console.error(error);
    }
  } */
  async ngOnInit() {
    console.log('A');
    await this.shopService.getProducts().subscribe({
      next: (response) => {
        console.log('B');

        this.products = response.data;
        this.paginations = response;

        console.log('C');
      },
    });
  }
}
