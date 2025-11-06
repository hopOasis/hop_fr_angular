import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-small-spinner',
  standalone: true,
  imports: [],
  templateUrl: './small-spinner.component.html',
  styleUrl: './small-spinner.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SmallSpinnerComponent {

}
