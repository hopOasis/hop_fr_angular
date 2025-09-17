import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-item',
  standalone: true,
  imports: [],
  templateUrl: './home-item.component.html',
  styleUrl: './home-item.component.scss',
})
export class HomeItemComponent {
  private router = inject(Router);

  redirectToShop() {
    this.router.navigate(['/shop']);
  }
}
