import { Routes } from '@angular/router';

import { Login } from './login/login';
import { Register } from './register/register';
import { Profile } from './profile/profile';
import { Products } from './products/products';
import { Hero } from './hero/hero';
import { OrdersComponent } from './orders/orders';
import { Cart } from './cart/cart';  
import { CheckoutComponent } from './checkout/checkout';
import { ReceiptComponent } from './receipt/receipt';

import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard';
import { AdminProductsComponent } from './admin/admin-products/admin-products';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders';

import { authGuard } from './guards/auth.guard';  
import { AdminGuard } from './guards/admin.guard';
export const routes: Routes = [
  { path: '', component: Hero },
  { path: 'products', component: Products },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard] },
  { path: 'cart', component: Cart }, 
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
  { path: 'receipt/:id', component: ReceiptComponent, canActivate: [authGuard] },

  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [AdminGuard] },
  { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AdminGuard] },
  
  { path: '**', redirectTo: '' }
];