import { Injectable, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';

Injectable();
export class FormService {
  private formsKeeper = signal<FormGroup | null>(null);

  setFrom(form: FormGroup) {
    this.formsKeeper.set(form);
  }

  getForm(): FormGroup | null {
    return this.formsKeeper();
  }
}
