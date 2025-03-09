import { Component, computed, DestroyRef, ElementRef } from '@angular/core';
import { inject, OnInit, signal, viewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreData } from '../../../core/data-access/state/models/store.model';
import { selectCartModalState } from '../../../core/data-access/state/store/cart-modal/cart-modal.selector';
import { cartModalState } from '../../../core/data-access/state/store/cart-modal/cart-modal.actions';
import { CartComponent } from '../../../user-cabinet/feature/cart/cart.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
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
})
export class CartModalComponent implements OnInit {
  private button = viewChild<ElementRef<HTMLSpanElement>>('buttonCloseModal');
  private destroyRef = inject(DestroyRef);
  private store = inject<Store<StoreData>>(Store);
  public visible = signal(false);
  public animationState = computed(() => (this.visible() ? 'open' : 'close'));
  onCloseModal(event: MouseEvent) {
    if (
      (event.target as HTMLDialogElement).classList.contains('dialog') ||
      event.target === this.button()?.nativeElement
    )
      this.store.dispatch(cartModalState({ isOpened: false }));
  }
  
  ngOnInit(): void {
    const stateSubscription = this.store
      .select(selectCartModalState)
      .subscribe((state) => {
        this.visible.set(state);
      });
    this.destroyRef.onDestroy(() => stateSubscription.unsubscribe());
  }
}
