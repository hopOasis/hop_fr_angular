import { ChangeDetectionStrategy, Component, computed, ElementRef } from '@angular/core';
import { inject, viewChild } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CartModalStore } from '../../data-access/store/cart-modal.store';
@Component({
  selector: 'app-cart-modal',
  standalone: true,
  imports: [CartComponent],
  animations: [
    trigger('modalState', [
      state(
        'open',
        style({
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        })
      ),
      state(
        'close',
        style({
          scale: '0',
          top: '50%',
          left: '50%',
          width: '0',
          height: '0',
        })
      ),
      transition('open => close', animate(200)),
      transition('close => open', animate(200)),
    ]),
  ],
  templateUrl: './cart-modal.component.html',
  styleUrl: './cart-modal.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CartModalComponent {
  private button = viewChild<ElementRef<HTMLSpanElement>>('buttonCloseModal');
  public animationState = computed(() =>
    this.cartModalStore.isOpened() ? 'open' : 'close'
  );
  readonly cartModalStore = inject(CartModalStore);
  onCloseModal(event: MouseEvent) {
    if (
      (event.target as HTMLDialogElement).classList.contains('dialog') ||
      event.target === this.button()?.nativeElement
    )
      this.cartModalStore.updateState(false);
  }
}
