import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';
  error = '';
  auth = inject(AuthService);
  router = inject(Router);

  submit() {
    this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: (user) => {
        if (user.role === 'admin') {
          this.router.navigateByUrl('/admin');
        } else {
          this.router.navigateByUrl('/');
        }
      },
      error: () => this.error = 'Invalid credentials'
    });
  }
}

