import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  products: any[] = [];
  isLoading = true;
  error: string | null = null;
  
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.loadProducts();
    
    // Reload products when navigating to the same route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url === '/products') {
          this.loadProducts();
        }
      });
  }

  loadProducts() {
    this.isLoading = true;
    this.error = null;
    
    this.http.get<any[]>(`${environment.apiUrl}/products`).subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load products';
        this.isLoading = false;
        console.error('Products loading error:', error);
      }
    });
  }

  addToCart(product: any) {
    const item = { 
      id: product._id,
      name: product.title || product.name, 
      price: product.price, 
      image: product.imageUrl || product.image, 
      description: product.description 
    };
    this.cartService.addToCart(item);
    alert(`${product.title || product.name} added to cart`);
  }
}