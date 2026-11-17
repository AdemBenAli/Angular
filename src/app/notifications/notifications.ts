import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.html',
  styleUrl: './notifications.css',
})
export class Notifications {
  readonly notifications = signal<string[]>([
    'Nouvelle conférence : Angular 21 Conference (15/11/2027)',
    'Il ne reste que 6 places pour le Signals Workshop',
  ]);

  readonly visible = signal(false);

  toggle(): void {
    this.visible.update((v) => !v);
  }
}
