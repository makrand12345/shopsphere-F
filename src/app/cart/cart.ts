import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart implements OnInit {
  cartItems: any[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.calculateTotal();
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.cartService.clearCart();
    this.cartItems.forEach(item => this.cartService.addToCart(item));
    this.calculateTotal();
  }

  updateQuantity(index: number, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(index);
      return;
    }
    this.cartItems[index].quantity = quantity;
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.total = 0;
  }
}
