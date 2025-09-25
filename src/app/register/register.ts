import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  error = '';

  private auth = inject(AuthService);
  private router = inject(Router);

  submit() {
    this.error = '';
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match';
      return;
    }
    this.auth.register(this.name, this.email, this.password).subscribe({
      next: (user) => {
        if (user.role === 'admin') {
          this.router.navigateByUrl('/admin');
        } else {
          this.router.navigateByUrl('/');
        }
      },
      error: (e) => this.error = 'Registration failed'
    });
  }
}

