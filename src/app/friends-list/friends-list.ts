import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-friends-list',
  imports: [FormsModule],
  templateUrl: './friends-list.html',
  styleUrl: './friends-list.css',
})
export class FriendsList {
  readonly friends = ['Sami', 'Sarra', 'Amine'];

  // Valeur partagée par les 3 champs : illustre les 3 formes de data-binding
  readonly name = signal('Ahmed');

  // Event binding : on met à jour le signal à la main à partir de l'événement DOM
  onInput(event: Event): void {
    this.name.set((event.target as HTMLInputElement).value);
  }
}
