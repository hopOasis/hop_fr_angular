import { Injectable, signal } from '@angular/core';
import { SearchResult } from '../../../interfaces/search-result.interface';

@Injectable({
  providedIn: 'root',
})
export class SearchResultSignalService {
  private searchResultData = signal<SearchResult[]>([]);

  setSearchResultData(result: SearchResult[]) {
    this.searchResultData.set(result);
  }

  getSearchResultData(): SearchResult[] {
    return this.searchResultData();
  }
}
