import { Component, signal } from '@angular/core';
import { AutoFocusDirective } from '../../directives/auto-focus.directive';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'header[appHeader]',
  standalone: true,
  imports: [AutoFocusDirective,RouterLink,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isShowedInput = signal(false);
  onShowInput(state: boolean) {
    this.isShowedInput.set(state);
  }
}
