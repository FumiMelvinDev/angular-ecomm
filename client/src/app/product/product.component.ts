import { Component, Input } from '@angular/core';
import { Product } from '../../Types';
import { currencyFormatter } from '../../lib/utils';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() product!: Product;

  getFormattedPrice() {
    return currencyFormatter(this.product.price);
  }
}
