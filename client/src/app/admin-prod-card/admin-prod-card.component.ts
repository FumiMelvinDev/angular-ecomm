import { Component, Input } from '@angular/core';
import { Product } from '../../Types';
import { currencyFormatter } from '../../lib/utils';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-prod-card',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './admin-prod-card.component.html',
  styleUrl: './admin-prod-card.component.css',
})
export class AdminProdCardComponent {
  @Input() product!: Product;

  getFormattedPrice() {
    return currencyFormatter(this.product.price);
  }
}
