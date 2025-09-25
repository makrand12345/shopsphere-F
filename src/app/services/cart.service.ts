import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  addToCart(product: any) {
    const existingItem = this.items.find(item => item.name === product.name);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
    this.cartCount.next(this.items.length);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    this.cartCount.next(this.items.length);
    return this.items;
  }
}
