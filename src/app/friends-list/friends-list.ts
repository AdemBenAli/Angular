import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-friends-list',
  imports: [FormsModule],
  templateUrl: './friends-list.html',
  styleUrl: './friends-list.css',
})
export class FriendsList {
  protected readonly friends = ['Sami', 'Sarra', 'Amine'];

  // Valeur partagée par les 3 champs : illustre les 3 formes de data-binding
  protected readonly name = signal('Ahmed');

  // Event binding : on met à jour le signal à la main à partir de l'événement DOM
  protected onInput(event: Event): void {
    this.name.set((event.target as HTMLInputElement).value);
  }
}
