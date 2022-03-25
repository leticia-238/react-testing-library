import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import pokemons from '../data';
import App from '../App';
import { readFavoritePokemonIds } from '../services/pokedexService';

const { name, id, foundAt } = pokemons[0];

describe('Testa o componente PokemonDetails.js', () => {
  beforeEach(() => { renderWithRouter(<App />); });

  it('Mostra as informações detalhadas do Pokémon selecionado', () => {
    const linkToPokemonDetails = screen.getByRole('link', { name: /More details/i });

    userEvent.click(linkToPokemonDetails);

    const titlePokemonDetails = screen
      .getByRole('heading', { level: 2, name: `${name} Details` });
    const titleSummary = screen.getByRole('heading', { level: 2, name: /Summary/i });

    const text = 'This intelligent Pokémon roasts hard berries with'
    + ' electricity to make them tender enough to eat.';

    const textSummary = screen.getByText((content, element) => (
      content.includes(text) && element.tagName === 'P'
    ));

    expect(titlePokemonDetails).toBeInTheDocument();
    expect(linkToPokemonDetails).not.toBeInTheDocument();
    expect(titleSummary).toBeInTheDocument();
    expect(textSummary).toBeInTheDocument();
  });

  it('Contém uma seção com os mapas das localizações do pokémon', () => {
    const linkToPokemonDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkToPokemonDetails);

    const titleLocations = screen
      .getByRole('heading', { level: 2, name: `Game Locations of ${name}` });

    expect(titleLocations).toBeInTheDocument();

    foundAt.forEach(({ location, map }, index) => {
      const locationName = screen.getByText(location);
      const locationImages = screen
        .getAllByRole('img', { name: `${name} location` });

      expect(locationName).toBeInTheDocument();
      expect(locationImages[index]).toHaveAttribute('src', map);
    });
  });

  it('Favorita um pokémon através da página de detalhes.', () => {
    localStorage.clear();

    const linkToPokemonDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkToPokemonDetails);

    const checkFavoritePokemon = screen.getByLabelText(/Pokémon favoritado?/i);

    expect(checkFavoritePokemon).toBeInTheDocument();
    expect(checkFavoritePokemon.checked).toBeFalsy();

    userEvent.click(checkFavoritePokemon);
    expect(checkFavoritePokemon.checked).toBeTruthy();

    expect(readFavoritePokemonIds()).toContain(id);

    userEvent.click(checkFavoritePokemon);
    expect(checkFavoritePokemon.checked).toBeFalsy();

    expect(readFavoritePokemonIds()).not.toContain(id);
  });
});
