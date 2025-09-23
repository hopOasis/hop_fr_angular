import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-2',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './page-2.component.html',
  styleUrl: './page-2.component.scss',
})
export class Page2Component {
  private readonly router = inject(Router);
  redirectToBrewery() {
    this.router.navigate(['/brewery']);
  }
}
