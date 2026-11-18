import '@testing-library/jest-dom'; 
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TarjetaUsuario } from './TarjetaUsuario.jsx';

describe('TarjetaUsuario', () => {
  const usuarioMock = {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
    company: { name: 'Romaguera-Crona' },
    address: { city: 'Gwenborough', street: 'Kulas Light', suite: 'Apt. 556' },
    favorito: false,
  };

  it('renderiza la información del usuario y llama a onFavoritoClick al hacer clic en el botón de favorito', async () => {
    const handleFavoritoClick = vi.fn();
    
    render(<TarjetaUsuario user={usuarioMock} onFavoritoClick={handleFavoritoClick} />);

    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText('@Bret')).toBeInTheDocument();

    const botonFavorito = screen.getByRole('button', { name: /favorito/i });
    await userEvent.click(botonFavorito);

    expect(handleFavoritoClick).toHaveBeenCalledWith(1);
  });
});