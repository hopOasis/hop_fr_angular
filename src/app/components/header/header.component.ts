import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AutoFocusDirective } from '../../directives/auto-focus.directive';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { StoreData } from '../../models/store.model';
import { showLoginModal } from '../../store/modal.actions';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'header[appHeader]',
  standalone: true,
  imports: [AutoFocusDirective, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private router = inject(Router)
  private scrollService = inject(ScrollService);
  private authService = inject(AuthService);
  public isShowedInput = signal(false);
  public isAuth$: Observable<boolean>;
  constructor(private store: Store<StoreData>) {
    this.isAuth$ = store.select('auth');
  }
  onShowInput(state: boolean) {
    this.isShowedInput.set(state);
  }
  onOpenModal() {
    this.store.dispatch(showLoginModal());
    this.scrollService.deleteScroll();
    this.scrollService.setActiveModal('login');
  }
  checkUserPermission(state: boolean) {
    if(state)this.router.navigate(['/my_cabinet'])
    else this.onOpenModal()
  }
}
