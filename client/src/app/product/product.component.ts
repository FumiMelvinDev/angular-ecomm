import { Component, Input } from '@angular/core';
import { Product } from '../../Types';
import { currencyFormatter } from '../../lib/utils';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input() product!: Product;

  getFormattedPrice() {
    return currencyFormatter(this.product.price);
  }
}
