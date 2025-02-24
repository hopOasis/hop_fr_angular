import { Injectable } from '@angular/core';
import { FormType } from '../models/form-types.model';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  setActiveModal(state: FormType | ''): void {
    if (typeof window !== undefined) localStorage.setItem('activeModal', state);
  }
  getActiveModal() {
    if (typeof window !== undefined) return localStorage.getItem('activeModal');
    return '';
  }
  addScroll(): void {
    document.body.style.overflow = 'scroll';
  }
  deleteScroll(): void {
    document.body.style.overflow = 'hidden';
  }
}
