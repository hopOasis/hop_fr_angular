import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { ProductStore } from '../../data-access/store/product.store';
import { ItemTypesEnum } from '../../data-access/models/item-types-enum.model';
import { ProductType } from '../../data-access/models/product-types.model';
import { SpinnerComponent } from '../../../shared/ui/spinner/spinner.component';
import { Router } from '@angular/router';
import { BreadcrumbComponent } from '../../ui/breadcrumb/breadcrumb.component';
import { UpdatePricePipe } from '../../utils/update-price.pipe';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BigBasketButtonComponent } from '../../ui/big-basket-button/big-basket-button.component';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    UpdatePricePipe,
    ToastModule,
    BigBasketButtonComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  providers: [ProductStore, MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnInit {
  private messageService = inject(MessageService);
  private router = inject(Router);
  readonly productStore = inject(ProductStore);
  type = input.required<ProductType>();
  productId = input.required<string>();
  productData = this.productStore.productData;
  loading = this.productStore.loading;
  error = this.productStore.error;
  productName = this.productStore.productName;
  imageUrl = this.productStore.imageUrl;
  constructor() {
    effect(() => {
      if (this.error()) this.router.navigate(['/not_found']);
    });
  }
  onMoveProduct() {}
  ngOnInit(): void {
    this.productStore.fetchData(+this.productId(), ItemTypesEnum[this.type()]);
  }
}
