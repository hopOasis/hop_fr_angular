import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
  standalone: true,
})
export class AutoFocusDirective implements AfterViewInit {
  public currentEl = inject(ElementRef);
  ngAfterViewInit(): void {
    this.currentEl.nativeElement.focus();
  }
}
