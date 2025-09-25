import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],  // allows routerLink in template
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {}
