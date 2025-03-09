import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TokenService } from './core/data-access/auth/services/token.service';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { AuthModalComponent } from './shared/ui/auth-modal/auth-modal.component';

import { CartModalComponent } from './shared/ui/cart-modal/cart-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    AuthModalComponent,
    CartModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private tokenService = inject(TokenService);

  ngOnInit(): void {
    this.tokenService.checkTokenInStorage();
  }
}
