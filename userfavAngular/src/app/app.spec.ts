import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('debería agregar y eliminar favoritos correctamente usando handleFavoritoClick', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app.totalFavoritos()).toBe(0);

    app.handleFavoritoClick(1, true);
    expect(app.totalFavoritos()).toBe(1);
    expect(app.idsFavoritos().has(1)).toBe(true);

    app.handleFavoritoClick(1, false);
    expect(app.totalFavoritos()).toBe(0);
    expect(app.idsFavoritos().has(1)).toBe(false);
  });
});