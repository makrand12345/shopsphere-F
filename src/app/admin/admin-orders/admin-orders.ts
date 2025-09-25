import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OrdersService, Order } from '../../services/orders.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-orders.html',
  styleUrls: ['./admin-orders.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  constructor(private http: HttpClient, private ordersSvc: OrdersService) {}
  ngOnInit() { this.load(); }
  load() { this.orders = this.ordersSvc.list(); }
  updateStatus(o: Order, status: string) {
    this.ordersSvc.updateStatus(o.id, status as any);
    this.load();
  }
}
