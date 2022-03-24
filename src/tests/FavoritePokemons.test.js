import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testa o componente FavoritePokemons.js.', () => {
  beforeEach(() => { localStorage.clear(); });

  it('Exibe na tela a mensagem "No favorite pokemon found", se a pessoa não'
  + ' tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);

    const textMessage = screen.getByText(/No favorite pokemon found/i);
    expect(textMessage).toBeInTheDocument();
  });

  it('Exibe todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    const pokemonNames = screen.getAllByTestId('pokemon-name');
    const linkToPokemonDetails = screen.getByRole('link', { name: /More details/i });

    expect(linkToPokemonDetails).toBeInTheDocument();
    userEvent.click(linkToPokemonDetails);

    const checkFavoritePokemon = screen.getByLabelText(/Pokémon favoritado?/i);

    expect(checkFavoritePokemon).toBeInTheDocument();
    userEvent.click(checkFavoritePokemon);

    history.push('/favorites');

    expect(pokemonNames).toHaveLength(1);
  });
});
