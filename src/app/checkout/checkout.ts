import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrdersService, CheckoutForm } from '../services/orders.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent {
  private cart = inject(CartService);
  private orders = inject(OrdersService);
  private router = inject(Router);

  items = this.cart.getItems();
  form: CheckoutForm = { fullName: '', address: '', city: '', postalCode: '', country: '', phone: '', paymentMethod: 'cod' };

  get total() { return this.items.reduce((s, it) => s + it.price * (it.quantity || 1), 0); }

  submit() {
    if (!this.items.length) { alert('Your cart is empty'); return; }
    const { paymentMethod, ...shipping } = this.form;
    const order = this.orders.create(this.items, shipping);
    this.cart.clearCart();
    this.router.navigateByUrl(`/receipt/${order.id}`);
  }
}


