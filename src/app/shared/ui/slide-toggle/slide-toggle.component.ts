import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slide-toggle',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './slide-toggle.component.html',
  styleUrl: './slide-toggle.component.scss',
})
export class SlideToggleComponent {
  checked = output<boolean>();
  toggle = false;

  onClick() {
    this.checked.emit(!this.toggle);
  }
}
