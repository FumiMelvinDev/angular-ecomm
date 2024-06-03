import { Component, Input } from '@angular/core';
import { Product } from '../../Types';
import { currencyFormatter } from '../../lib/utils';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
@Component({
  selector: 'app-admin-prod-card',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './admin-prod-card.component.html',
  styleUrl: './admin-prod-card.component.css',
})
export class AdminProdCardComponent {
  @Input() product!: Product;

  constructor(public dialog: MatDialog) {}

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(EditPopupComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  getFormattedPrice() {
    return currencyFormatter(this.product.price);
  }
}
