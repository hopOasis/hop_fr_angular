import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import {
  ProductTypes,
  ProductTypesEnum,
} from '../../../models/product-types.model';
import { ProductsService } from '../../../services/products.service';
import { sign } from 'crypto';
import { FetchedProductData } from '../../../models/product.model';
import { ProductDescription } from '../../../models/pageable.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private productService = inject(ProductsService);
  public productId = input.required<string>();
  public type = input.required<ProductTypes>();
  public productData = signal<ProductDescription | null>(null);
  ngOnInit(): void {
    const subscription = this.productService
      .getProductFullData(ProductTypesEnum[this.type()], this.productId())
      .subscribe((data) => {
        this.productData.set(data);
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
