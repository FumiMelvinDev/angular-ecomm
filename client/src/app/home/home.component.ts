import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../../Types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService
      .getAllProducts('http://localhost:5000/api', {})
      .subscribe((products: Products) => {
        console.log(products.products);
      });
  }
}
