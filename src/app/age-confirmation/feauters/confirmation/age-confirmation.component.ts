import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Is18ConfirmedService } from '../../data-access/is-18-confirmed.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-age-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './age-confirmation.component.html',
  styleUrl: './age-confirmation.component.scss',
})
export class AgeConfirmationComponent implements OnInit {
  private readonly router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  is18Confirmed = inject(Is18ConfirmedService);
  isConfirm = true;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (JSON.parse(localStorage.getItem('is18Confirmed')!))
        this.is18Confirmed.confirmation = true;
      this.router.navigate(['/home']);
    }
  }

  confirmed(value: boolean) {
    if (value) {
      localStorage.setItem('is18Confirmed', value.toString());
      this.is18Confirmed.confirmation = value;
      this.router.navigate(['/home']);
    } else {
      this.is18Confirmed.confirmation = false;
      localStorage.setItem('is18Confirmed', value.toString());
      this.isConfirm = false;
    }
  }
}
