import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileOrdersComponent } from './profile-orders';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ProfileOrdersComponent],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  auth = inject(AuthService);

  ngOnInit() {
    if (!this.auth.me$.value && this.auth.token) {
      this.auth.fetchMe().subscribe();
    }
  }
}


