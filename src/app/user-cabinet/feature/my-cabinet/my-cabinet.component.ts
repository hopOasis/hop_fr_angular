import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreData } from '../../../core/data-access/state/models/store.model';
import { selectFirstName } from '../../../core/data-access/state/store/user/user.selectors';
import { AsyncPipe } from '@angular/common';
import { updateToken } from '../../../core/data-access/state/store/token/token.actions';

@Component({
  selector: 'app-my-cabinet',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe, RouterOutlet],
  templateUrl: './my-cabinet.component.html',
  styleUrl: './my-cabinet.component.scss',
})
export class MyCabinetComponent {
  private router = inject(Router);
  private store = inject<Store<StoreData>>(Store);
  public name$ = this.store.select(selectFirstName);

  logout() {
    this.store.dispatch(updateToken({ token: { access_token: '' } }));
    this.router.navigate(['/home']);
  }
}
