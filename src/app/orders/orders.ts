import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.html',
  styleUrls: ['./orders.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  api = 'http://localhost:4000/api/orders/my';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(this.api).subscribe({
      next: (data) => (this.orders = data),
      error: (err) => console.error(err)
    });
  }
}
