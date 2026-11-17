import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  it('affiche les 6 sections de la page d\'accueil', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const html = fixture.nativeElement as HTMLElement;
    for (const tag of ['app-header', 'app-navbar', 'app-user-profile', 'app-friends-list', 'app-notifications', 'app-footer']) {
      expect(html.querySelector(tag)).not.toBeNull();
    }
    expect(html.querySelector('h1')?.textContent).toBe('Conference App');
  });
});
