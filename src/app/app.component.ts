import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegistrationComponent } from './components/modals/registration/registration.component';
import { LoginComponent } from './components/modals/login/login.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { ScrollService } from './services/scroll.service';
import { StoreData } from './models/store.model';
import { showLoginModal, showRegisterModal } from './store/modal.actions';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    RegistrationComponent,
    LoginComponent,
    AsyncPipe,
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private scrollService = inject(ScrollService);
  public isShowedLogin$: Observable<boolean>;
  public isShowedRegister: Observable<boolean>;
  constructor(private store: Store<StoreData>) {
    this.isShowedLogin$ = this.store.select('loginModal');
    this.isShowedRegister = this.store.select('registerModal');
  }
  ngOnInit(): void {
    let activeModal = this.scrollService.getActiveModal();
    if (activeModal === 'login') this.store.dispatch(showLoginModal());
    else if (activeModal === 'register')
      this.store.dispatch(showRegisterModal());
    if (activeModal) this.scrollService.deleteScroll();
  }
}
