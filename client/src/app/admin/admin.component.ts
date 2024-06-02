import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Product, Products } from '../../Types';
import { ProductsService } from '../services/products.service';
import { AdminProdCardComponent } from '../admin-prod-card/admin-prod-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  imports: [CommonModule, MatButtonModule, AdminProdCardComponent],
})
export class AdminComponent {
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

  addProduct(product: Product) {
    console.log('add product');

    this.productsService
      .addProduct('http://localhost:5000/api', product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.pageSize);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  updateProduct(product: Product, id: number) {
    console.log('edit product');

    this.productsService
      .updateProduct(`http://localhost:5000/api/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.pageSize);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteProduct(id: number) {
    console.log('delete product');

    this.productsService
      .deleteProduct(`http://localhost:5000/api/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.pageSize);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit() {
    // We need to set the initial page and productsPerPage values to kick off the
    // initial fetchProducts call.
    this.fetchProducts(0, this.pageSize);
  }
}
