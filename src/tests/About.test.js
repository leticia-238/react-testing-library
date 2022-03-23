import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import About from '../components/About';

describe('Testa o componente About.js.', () => {
  beforeEach(() => { renderWithRouter(<About />); });

  it('Contém um heading h2 com o texto About Pokédex.', () => {
    const titleAbout = screen
      .getByRole('heading', { level: 2, name: /About Pokédex/i });

    expect(titleAbout).toBeInTheDocument();
  });

  it('Contém dois parágrafos com texto sobre a Pokédex.', () => {
    const firstText = 'This application simulates a Pokédex, a digital'
    + ' encyclopedia containing all Pokémons';
    const secondText = 'One can filter Pokémons by type, and see more'
    + ' details for each one of them';

    const firstParagraph = screen.getByText(firstText);
    const secondParagraph = screen.getByText(secondText);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Contém a imagem de uma Pokédex: .', () => {
    const imageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imageUrl);
  });
});
