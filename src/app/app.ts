import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './nav/nav';
import { Products } from "./products/products";
import { Hero } from "./hero/hero";
import { Footer } from './footer/footer';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Nav, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  private auth = inject(AuthService);

  ngOnInit(): void {
    if (this.auth.token && !this.auth.me$.value) {
      this.auth.fetchMe().subscribe();
    }
  }
}
