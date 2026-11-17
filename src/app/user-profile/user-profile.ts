import { Component, signal } from '@angular/core';

interface User {
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.html',
})
export class UserProfile {
  protected readonly user = signal<User>({ name: 'Ahmed', email: 'ahmed@email.com' });
}
