import { Component, computed, signal } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Conference } from '../models/conference';

@Component({
  selector: 'app-conference-list',
  imports: [FormsModule, DatePipe, UpperCasePipe],
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css',
})
export class ConferenceList {
  // Liste des conférences (propriété classique : on modifie directement nbParticipants)
  readonly conferences: Conference[] = [
    {
      id: 1,
      title: 'Angular 21 Conference',
      description: "Les nouveautés d'Angular 21 : signals, zoneless, contrôle de flux natif.",
      date: new Date(2027, 10, 15),
      place: 'Tunis',
      maxParticipants: 100,
      nbParticipants: 75,
    },
    {
      id: 2,
      title: 'Signals Workshop',
      description: 'Atelier pratique sur signal(), computed() et effect().',
      date: new Date(2027, 10, 30),
      place: 'Ariana',
      maxParticipants: 40,
      nbParticipants: 34,
    },
    {
      id: 3,
      title: 'Web Conference',
      description: 'Panorama des technologies et tendances du développement web.',
      date: new Date(2027, 10, 20),
      place: 'Sousse',
      maxParticipants: 150,
      nbParticipants: 150,
    },
  ];

  // Texte saisi dans la zone de recherche (two-way binding avec [(ngModel)])
  readonly searchTerm = signal('');

  // id de la conférence dont on affiche les détails (0 = aucune)
  readonly selectedId = signal(0);

  // Date du jour : sert à ne garder que les conférences "à venir"
  readonly today = new Date();

  // Signal computed : se recalcule tout seul quand searchTerm change
  readonly filtered = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    return this.conferences.filter(
      (c) => c.date >= this.today && c.title.toLowerCase().includes(term),
    );
  });

  remainingPlaces(c: Conference): number {
    return c.maxParticipants - c.nbParticipants;
  }

  // +1 participant par clic (sans dépasser la capacité maximale)
  register(c: Conference): void {
    if (this.remainingPlaces(c) > 0) {
      c.nbParticipants++;
    }
  }

  toggleDetails(id: number): void {
    this.selectedId.update((current) => (current === id ? 0 : id));
  }
}
