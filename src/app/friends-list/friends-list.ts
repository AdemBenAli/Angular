import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-friends-list',
  imports: [FormsModule],
  templateUrl: './friends-list.html',
  styleUrl: './friends-list.css',
})
export class FriendsList {
  readonly friends = signal(['Ahmed', 'Ahmed', 'Ahmed']);

  updateFriend(index: number, value: string): void {
    this.friends.update((current) =>
      current.map((friend, friendIndex) => (friendIndex === index ? value : friend)),
    );
  }

  onInput(index: number, event: Event): void {
    this.updateFriend(index, (event.target as HTMLInputElement).value);
  }
}
