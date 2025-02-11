import { Component, inject, signal } from '@angular/core';
import { AutoFocusDirective } from '../../directives/auto-focus.directive';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { StoreData } from '../../models/store.model';
import { showLoginModal } from '../../store/modal.actions';
@Component({
  selector: 'header[appHeader]',
  standalone: true,
  imports: [AutoFocusDirective, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private scrollService = inject(ScrollService);
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
}
