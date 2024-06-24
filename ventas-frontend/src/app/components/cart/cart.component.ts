import { Component } from '@angular/core';
import { PrePurchaseService } from '../../services/pre-purchase.service';
import { Router } from 'express';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cart: any[] = JSON.parse(localStorage.getItem('cart') || '[]');

  constructor(private prePurchaseService: PrePurchaseService, private router: Router) {}

  checkout(): void {
    const customerId = 1; // Placeholder for actual customer ID
    const products = this.cart.map(item => ({ id: item.id, quantity: item.quantity }));
    this.prePurchaseService.createPrePurchase({ customerId, products }).subscribe((data) => {
      localStorage.setItem('prePurchase', JSON.stringify(data));
      (<any>this.router).navigate([`/pre-purchase`]);
    });
  }
}
