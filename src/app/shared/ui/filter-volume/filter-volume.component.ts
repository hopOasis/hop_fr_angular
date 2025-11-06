import { Component } from '@angular/core';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'app-filter-volume',
  standalone: true,
  imports: [CheckboxComponent],
  templateUrl: './filter-volume.component.html',
  styleUrl: './filter-volume.component.scss',
})
export class FilterVolumeComponent {
  arrowActive = false;
  volumeFilterActive = false;
  volumeOptions = [0.33, 0.5, 0.75];

  arrowToggle() {
    this.arrowActive = !this.arrowActive;
    this.volumeFilterActive = !this.volumeFilterActive;
  }
}
