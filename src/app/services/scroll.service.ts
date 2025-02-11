import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreData } from '../models/store.model';
import { FormType } from '../models/form-types.model';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  setActiveModal(state: FormType | '') {
    localStorage.setItem('activeModal', state);
  }
  getActiveModal() {
    return localStorage.getItem('activeModal');
  }
  addScroll() {
    document.body.style.overflow = 'scroll';
  }
  deleteScroll() {
    document.body.style.overflow = 'hidden';
  }
}
