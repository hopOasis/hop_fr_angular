import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent {
  isChecked = output<boolean>();
  checked = false;

  onClick() {
    this.isChecked.emit(!this.checked);
  }
}
