import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WritableSignal } from '@angular/core';
import { ConferenceList } from './conference-list';
import { Conference } from '../models/conference';

describe('ConferenceList', () => {
  let fixture: ComponentFixture<ConferenceList>;
  let el: HTMLElement;

  const cards = () => Array.from(el.querySelectorAll<HTMLElement>('article'));
  const buttons = () => Array.from(el.querySelectorAll<HTMLButtonElement>('button.btn'));

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ConferenceList] }).compileComponents();
    fixture = TestBed.createComponent(ConferenceList);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('affiche les titres en majuscules et les dates formatées', () => {
    expect(cards().length).toBe(3);
    expect(cards()[0].querySelector('h3')?.textContent).toBe('ANGULAR 21 CONFERENCE');
    expect(cards()[0].textContent).toContain('15/11/2027');
  });

  it('colore le bouton selon les places restantes (vert / orangé / rouge)', () => {
    const [angular, signals, web] = buttons();
    expect(angular.classList).toContain('available');
    expect(signals.classList).toContain('low');
    expect(web.classList).toContain('full');
    expect(web.disabled).toBe(true);
  });

  it('incrémente le nombre de participants à chaque clic et passe en orangé sous 10 places', async () => {
    const btn = buttons()[0];
    btn.click();
    await fixture.whenStable();
    expect(cards()[0].textContent).toContain('Places restantes : 24');

    for (let i = 0; i < 15; i++) btn.click(); // 25 → 9 places restantes
    await fixture.whenStable();
    expect(cards()[0].textContent).toContain('Places restantes : 9');
    expect(buttons()[0].classList).toContain('low');
  });

  it('filtre les conférences par une partie du titre', async () => {
    const input = el.querySelector<HTMLInputElement>('input.search')!;
    input.value = 'sIgNaLs';
    input.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(cards().length).toBe(1);
    expect(cards()[0].querySelector('h3')?.textContent).toBe('SIGNALS WORKSHOP');
  });

  it("affiche un message quand aucune conférence n'est enregistrée", async () => {
    (fixture.componentInstance as unknown as { conferences: WritableSignal<Conference[]> })
      .conferences.set([]);
    await fixture.whenStable();
    expect(cards().length).toBe(0);
    expect(el.querySelector('.message')?.textContent).toContain("Aucune conférence n'est enregistrée");
  });

  it('affiche les détails au clic sur une conférence', async () => {
    cards()[1].click();
    await fixture.whenStable();
    expect(cards()[1].querySelector('.description')).not.toBeNull();
  });
});
