import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Page1Component } from './page-1/page-1.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Page1Component],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class HomeComponent {

}
