import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService, Order } from '../services/orders.service';

@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receipt.html',
  styleUrls: ['./receipt.css']
})
export class ReceiptComponent {
  private route = inject(ActivatedRoute);
  private orders = inject(OrdersService);
  private router = inject(Router);
  order: Order | null = null;

  constructor(){
    const id = this.route.snapshot.paramMap.get('id');
    const list = this.orders.list();
    this.order = list.find(o => o.id === id) || null;
    if (!this.order) this.router.navigateByUrl('/');
  }
}


