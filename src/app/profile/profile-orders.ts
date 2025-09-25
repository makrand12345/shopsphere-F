import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService, Order } from '../services/orders.service';

@Component({
  selector: 'app-profile-orders',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="orders" *ngIf="orders.length; else empty">
    <div class="order" *ngFor="let o of orders">
      <div class="top">
        <div>{{ o.createdAt | date:'medium' }}</div>
        <div>Status: {{ o.status }}</div>
        <div>Total: ₹{{ o.total }}</div>
      </div>
      <div class="items">
        <div *ngFor="let it of o.items">{{ it.name }} × {{ it.quantity || 1 }} — ₹{{ it.price * (it.quantity || 1) }}</div>
      </div>
    </div>
  </div>
  <ng-template #empty><p>No orders yet.</p></ng-template>
  `,
  styles: [`
  .orders { margin-top: 1rem; display: grid; gap: 1rem; }
  .order { background: rgba(15, 15, 26, 0.85); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: 12px; padding: 1rem; }
  .top { display: flex; justify-content: space-between; color: #c4b5fd; margin-bottom: 0.5rem; }
  .items { color: #a1a1c2; }
  `]
})
export class ProfileOrdersComponent implements OnInit {
  private ordersSvc = inject(OrdersService);
  orders: Order[] = [];
  ngOnInit() { this.orders = this.ordersSvc.list(); }
}


