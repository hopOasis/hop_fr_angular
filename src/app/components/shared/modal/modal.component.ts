import {
  Component,
  ElementRef,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { FormType } from '../../../models/form-types.model';
import { Store } from '@ngrx/store';
import { StoreData } from '../../../models/store.model';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  hideLoginModal,
  hideRegisterModal,
  showLoginModal,
  showRegisterModal,
} from '../../../store/modal.actions';
import { ScrollService } from '../../../services/scroll.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  private scrollService = inject(ScrollService);
  public typeOfForm = input.required<FormType>();

  constructor(private store: Store<StoreData>) {}
  private formWrapper = viewChild<ElementRef<HTMLDivElement>>('dialogWrapper');
  ngOnInit(): void {}
  onOpenRegister() {
    this.store.dispatch(hideLoginModal());
    this.store.dispatch(showRegisterModal());
    this.scrollService.setActiveModal('register');
  }
  onOpenLogin() {
    this.store.dispatch(hideRegisterModal());
    this.store.dispatch(showLoginModal());
    this.scrollService.setActiveModal('login');
  }
  onCloseModal() {
    this.store.dispatch(hideRegisterModal());
    this.store.dispatch(hideLoginModal());
    this.scrollService.addScroll();
    this.scrollService.setActiveModal('');
  }
  onCloseModalNext(event: MouseEvent) {
    if (event.target === this.formWrapper()?.nativeElement) this.onCloseModal();
  }
}
