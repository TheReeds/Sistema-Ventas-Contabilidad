import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<Product[]>([]);
  cart$ = this.cart.asObservable();

  addToCart(product: Product): void {
    const currentCart = this.cart.value;
    this.cart.next([...currentCart, product]);
  }

  removeFromCart(productId: string): void {
    const currentCart = this.cart.value.filter(p => p.id !== productId);
    this.cart.next(currentCart);
  }

  clearCart(): void {
    this.cart.next([]);
  }
}
