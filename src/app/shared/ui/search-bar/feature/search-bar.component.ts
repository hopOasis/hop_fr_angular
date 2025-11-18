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
import { Router } from '@angular/router';

import { SearchDropDownComponent } from './search-drop-down/search-drop-down.component';
import { SearchStore } from '../data-access/search.store';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, SearchDropDownComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  providers: [SearchStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  private readonly elementRef = inject(ElementRef);
  private readonly router = inject(Router);
  readonly searchStore = inject(SearchStore);

  searchOnFocus = output<boolean>();
  searchFocus = signal<boolean>(false);
  searchWord = '';

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
    this.searchStore.getData(searchWord);
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
