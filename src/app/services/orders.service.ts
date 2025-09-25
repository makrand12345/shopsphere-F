import { Injectable } from '@angular/core';

export type CartItem = { name: string; price: number; quantity: number; image?: string; description?: string };
export type CheckoutForm = { fullName: string; address: string; city: string; postalCode: string; country: string; phone: string; paymentMethod: 'cod' | 'card' };
export type OrderStatus = 'paid' | 'packed' | 'dispatched' | 'delivered' | 'cancelled';
export type Order = { id: string; items: CartItem[]; total: number; createdAt: string; status: OrderStatus; shipping: Omit<CheckoutForm, 'paymentMethod'> };

@Injectable({ providedIn: 'root' })
export class OrdersService {
  private storageKey = 'shopsphere_orders';

  list(): Order[] {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) as Order[] : [];
  }

  create(items: CartItem[], shipping: Omit<CheckoutForm, 'paymentMethod'>): Order {
    const total = items.reduce((s, it) => s + it.price * (it.quantity || 1), 0);
    const order: Order = {
      id: crypto.randomUUID(),
      items: items.map(i => ({ ...i })),
      total,
      createdAt: new Date().toISOString(),
      status: 'paid',
      shipping
    };
    const all = this.list();
    all.unshift(order);
    localStorage.setItem(this.storageKey, JSON.stringify(all));
    return order;
  }

  updateStatus(id: string, status: OrderStatus): void {
    const all = this.list();
    const idx = all.findIndex(o => o.id === id);
    if (idx >= 0) {
      all[idx] = { ...all[idx], status };
      localStorage.setItem(this.storageKey, JSON.stringify(all));
    }
  }
}


