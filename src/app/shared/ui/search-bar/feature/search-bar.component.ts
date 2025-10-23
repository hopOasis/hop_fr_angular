import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchDropDownComponent } from './search-drop-down/search-drop-down.component';
import { ResultStore } from '../data-access/store';
import { SearchResultService } from '../data-access/search-result.service';
import { SearchResult } from '../../../interfaces/search-result.interface';
import { Router } from '@angular/router';
import { SearchResultSignalService } from '../data-access/search-result-signal.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, SearchDropDownComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  providers: [ResultStore, SearchResultService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  private readonly elementRef = inject(ElementRef);
  private readonly router = inject(Router);
  private searchResultSignal = inject(SearchResultSignalService);

  store = inject(ResultStore);
  searchOnFocus = output<boolean>();
  searchFocus = signal<boolean>(false);
  searchWord = '';
  empty: SearchResult = {
    id: '',
    name: '',
    imageUrl: '',
    itemType: '',
    description: '',
    price: 0,
    amount: 0,
    quantity: 0,
    averageRating: 0,
  };

  @HostListener('document:click', ['$event']) onClick(event: Event) {
    const target = event.target as HTMLElement;
    if (this.elementRef.nativeElement.contains(target)) {
      this.searchFocus.set(true);
      this.searchOnFocus.emit(true);
    } else {
      this.searchFocus.set(false);
      this.searchOnFocus.emit(false);
    }
  }

  search(searchWord: string) {
    /**
     * @dev uncomment it if you want user to see the previous search result
     * before user apply a new search result*/
    // if (this.searchWord.length >= 3) {
    this.store.loadSearchResult(searchWord);
    this.searchResultSignal.setSearchResultData(this.store.productData());

    // }
  }

  searchResult() {
    this.search(this.searchWord);
    this.router.navigate(['/searchresult'], {
      queryParams: { searchWord: this.searchWord },
    });
  }

  clearSearch(): void {
    this.searchWord = '';
  }
}
