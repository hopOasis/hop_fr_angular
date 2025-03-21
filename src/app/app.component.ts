import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { AuthModalComponent } from './authentication/feature/auth-modal/auth-modal.component';
import { CartModalComponent } from './cart/feature/cart-modal/cart-modal.component';
import { AuthApiService } from './authentication/data-access/api/auth-api.service';

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
  styleUrl: './app.component.scss',changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  readonly authApi = inject(AuthApiService);
  ngOnInit(): void {
    this.authApi.checkTokenInStore();
  }
}
