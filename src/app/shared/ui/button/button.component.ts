import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  icon = input<string | undefined>();
  disabled = input<boolean>(false);
  clicked = output();
  isActive = signal(false);

  onClick() {
    if (!this.disabled()) {
      this.clicked.emit();
      this.isActive.set(!this.isActive());
    }
  }
}
