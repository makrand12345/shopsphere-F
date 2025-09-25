// shopsphere-F/src/app/nav/nav.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.html',
  styleUrls: ['./nav.css']
})
export class Nav implements OnInit {
  cartCount = 0;
  currentUser: any = null;
  isAdmin = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    // Subscribe to user changes
    this.authService.me$.subscribe(user => {
      this.currentUser = user;
      this.isAdmin = !!(user && user.role === 'admin');
    });
  }

  logout() {
    this.authService.logout();
  }
}
