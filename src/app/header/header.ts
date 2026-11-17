import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  // Données fournies par le composant parent (property binding) → composant réutilisable
  readonly appTitle = input('Conference App');
  readonly subtitle = input('Bienvenue sur votre espace utilisateur');
}
