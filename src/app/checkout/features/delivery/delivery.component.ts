import { Component, inject } from '@angular/core';
import { UserStore } from '../../../user/data-access/store/user.store';
import { progressConfig, Progress } from '../../utils/progress.config';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.scss',
})
export class DeliveryComponent {
  private readonly userStore = inject(UserStore);
  public userName = this.userStore.userName;
  public progress = progressConfig;
  prog = new Progress();

  show(id: number) {
    this.prog.udpateCurrentProgress(id);
    console.log(this.prog.activeProgress());
  }
}
