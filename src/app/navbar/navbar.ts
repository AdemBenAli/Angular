import { Component, signal } from '@angular/core';

interface NavLink {
  label: string;
  target: string; // id de la section visée
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected readonly links: NavLink[] = [
    { label: 'Accueil', target: 'accueil' },
    { label: 'Profil', target: 'profil' },
    { label: 'Conférences', target: 'conferences' },
    { label: 'Amis', target: 'amis' },
    { label: 'Notifications', target: 'notifications' },
    { label: 'Admin', target: 'admin' }, // page à venir (routage : prosit suivant)
  ];

  protected readonly active = signal('accueil');

  protected select(target: string): void {
    this.active.set(target);
  }
}
