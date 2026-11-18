import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [
      { id: 1, name: 'Leanne Graham', username: 'Bret', email: 's@a.com', company: { name: 'C' }, address: { city: 'G' } },
      { id: 2, name: 'Ervin Howell', username: 'Antonette', email: 'e@a.com', company: { name: 'C' }, address: { city: 'G' } },
    ],
  });
});

describe('App', () => {
  it('filtra la lista de usuarios correctamente al escribir en la barra de búsqueda', async () => {
    render(<App />);

    expect(await screen.findByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('Ervin Howell')).toBeInTheDocument();

    const inputBusqueda = screen.getByPlaceholderText('Buscar por nombre...');
    await userEvent.type(inputBusqueda, 'Bret');

    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.queryByText('Ervin Howell')).not.toBeInTheDocument();
  });
});