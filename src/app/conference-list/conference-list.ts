import { Component, computed, signal } from '@angular/core';
import { DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Conference } from '../models/conference';

/** Seuil en dessous duquel il reste "peu de places" (bouton orangé). */
const LOW_PLACES_THRESHOLD = 10;

type Availability = 'available' | 'low' | 'full';

@Component({
  selector: 'app-conference-list',
  imports: [FormsModule, NgClass, DatePipe, UpperCasePipe],
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css',
})
export class ConferenceList {
  protected readonly conferences = signal<Conference[]>([
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
  ]);

  /** Texte saisi dans la zone de recherche (two-way binding via ngModel). */
  protected readonly searchTerm = signal('');

  /** Conférence dont les détails sont affichés (clic sur la carte). */
  protected readonly selectedId = signal<number | null>(null);

  /** Liste filtrée : se recalcule seule quand la recherche ou les données changent. */
  protected readonly filtered = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    return this.conferences().filter((c) => c.title.toLowerCase().includes(term));
  });

  protected remainingPlaces(c: Conference): number {
    return c.maxParticipants - c.nbParticipants;
  }

  /** available (vert) / low (orangé, < 10 places) / full (rouge, 0 place) */
  protected availability(c: Conference): Availability {
    const remaining = this.remainingPlaces(c);
    if (remaining <= 0) return 'full';
    if (remaining < LOW_PLACES_THRESHOLD) return 'low';
    return 'available';
  }

  /** +1 participant par clic (sans dépasser la capacité maximale). */
  protected register(c: Conference): void {
    if (this.remainingPlaces(c) <= 0) return;
    this.conferences.update((list) =>
      list.map((x) => (x.id === c.id ? { ...x, nbParticipants: x.nbParticipants + 1 } : x)),
    );
  }

  protected toggleDetails(id: number): void {
    this.selectedId.update((current) => (current === id ? null : id));
  }
}
