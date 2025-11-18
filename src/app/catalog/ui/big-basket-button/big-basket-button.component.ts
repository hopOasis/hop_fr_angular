import { Component, computed, inject, input, output } from '@angular/core';
import { ProductStore } from '../../data-access/store/product.store';
import { SmallSpinnerComponent } from '../../../shared/ui/small-spinner/small-spinner.component';
import { NgTemplateOutlet } from '@angular/common';
import { AuthApiService } from '../../../authentication/data-access/api/auth-api.service';
@Component({
  selector: 'app-big-basket-button',
  standalone: true,
  imports: [SmallSpinnerComponent, NgTemplateOutlet],
  templateUrl: './big-basket-button.component.html',
  styleUrl: './big-basket-button.component.scss',
})
export class BigBasketButtonComponent {
  isAuth = inject(AuthApiService)
  buttonMode = input.required<'big' | 'small'>();
  productStore = inject(ProductStore);
  onClickButton = output<void>();
  isCurrentOption = this.productStore.currentOption;
  isOptionInCart = this.productStore.currentOptionInCart;
  currentContent = computed(() => {
    if (!this.isCurrentOption()) return 'Нема в наявності';
    if (this.isOptionInCart()) return 'Видалити';
    return 'У кошик';
  });
}
