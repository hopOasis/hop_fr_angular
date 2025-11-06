import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Is18ConfirmedService {
  private readonly is18Confirmed: WritableSignal<boolean> = signal(false);

  get canActivate(): boolean {
    return this.is18Confirmed();
  }

  set confirmation(is18Confirmed: boolean) {
    this.is18Confirmed.set(is18Confirmed);
  }
}
