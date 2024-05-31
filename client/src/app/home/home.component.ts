import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../Types';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [ProductComponent, CommonModule, MatPaginatorModule],
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];

  totalRecords: number = 0;
  pageSize: number = 8;

  onPageChage(event: any) {
    this.fetchProducts(event.page, event.pageSize);
  }

  fetchProducts(page: number, productsPerPage: number) {
    this.productsService
      .getAllProducts('http://localhost:5000/api', {
        page,
        productsPerPage,
      })
      .subscribe((products: Products) => {
        console.log(products.products);
        this.products = products.products;
        this.totalRecords = products.total;
      });
  }

  ngOnInit() {
    // We need to set the initial page and productsPerPage values to kick off the
    // initial fetchProducts call.
    this.fetchProducts(0, this.pageSize);
  }
}
