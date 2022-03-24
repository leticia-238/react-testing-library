import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound.js', () => {
  beforeEach(() => { renderWithRouter(<NotFound />); });

  it('Contém um heading h2 com o texto "Page requested not found"', () => {
    const titleNotFound = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i });

    expect(titleNotFound).toBeInTheDocument();
  });

  it('Mostra a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif".', () => {
    const imageUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });

    expect(image).toHaveAttribute('src', imageUrl);
  });
});
