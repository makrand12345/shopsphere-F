import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, NgFor],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {
  private http = inject(HttpClient);
  products: any[] = [];

  ngOnInit(): void {
    this.http.get<any[]>(`http://localhost:4000/api/products`).subscribe(p => this.products = p);
  }
}
