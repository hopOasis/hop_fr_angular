import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthApiService } from '../../../authentication/data-access/api/auth-api.service';
import { CartApiService } from '../../../cart/data-access/api/cart-api.service';

@Component({
  selector: 'header[appHeader]',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnDestroy {
  searchQuery = '';
  private destroy$ = new Subject<void>();

  readonly authApiService = inject(AuthApiService);
  readonly cartApiService = inject(CartApiService);

  constructor(private http: HttpClient) {}

  searchProduct(): void {
    const query = this.searchQuery.trim();
    if (!query) return;

    // const params = new HttpParams().set('name', query);
    const params = new HttpParams().set('beerName', query);
    // this.http.get<{ content: any[] }>('https://hopoasis.onrender.com/products-bundle', { params }) 
    this.http.get<{ content: any[] }>('https://hopoasis.onrender.com/beers')
  .pipe(takeUntil(this.destroy$))
  .subscribe({
    next: (response) => {
      if (response && response.content) {
        const filteredProducts = response.content.filter(product => 
          product.beerName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        console.log('Знайдені:', filteredProducts);
      } else {
        console.log('Немае таких данних');
      }
      this.searchQuery = '';
      
    },
    error: (error) => {
      console.error('Помилка пошуку:', error);
    }
  });


  }

  onOpenModal(isAuthorized: boolean): void {
    if (!isAuthorized) {
      this.authApiService.updateModalState(true);
    }
  }

  openCartModal(): void {
    this.cartApiService.updateState(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}