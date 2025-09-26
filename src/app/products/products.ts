import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule], // ✅ Add this
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products implements OnInit {
  private http = inject(HttpClient);
  products: any[] = [];
  
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.http.get<any[]>(`${environment.apiUrl}/products`).subscribe(products => {
      this.products = products;
    });
  }

  addToCart(product: any) {
    const item = { name: product.title, price: product.price, image: product.imageUrl, description: product.description };
    this.cartService.addToCart(item);
    alert(`${product.title} added to cart`);
  }

}
