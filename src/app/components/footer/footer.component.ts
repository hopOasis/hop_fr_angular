import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'footer[appFooter]',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
