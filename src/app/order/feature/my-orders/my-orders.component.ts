import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MyOrdersComponent {

}
