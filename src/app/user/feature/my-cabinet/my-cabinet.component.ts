import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AuthApiService } from '../../../authentication/data-access/api/auth-api.service';

@Component({
  selector: 'app-my-cabinet',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './my-cabinet.component.html',
  styleUrl: './my-cabinet.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MyCabinetComponent {
  private router = inject(Router);
  private authApiService = inject(AuthApiService);

  logout() {
    this.authApiService.logOut();
    this.router.navigate(['/home']);
  }
}
