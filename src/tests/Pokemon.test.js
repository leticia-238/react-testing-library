import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';
import { updateFavoritePokemons } from '../services/pokedexService';

describe('Testa o componente Pokemon.js', () => {
  it('Renderiza um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const { name, type, averageWeight: { value, measurementUnit }, image } = pokemons[0];

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img', { name: `${name} sprite` });

    expect(pokemonName).toHaveTextContent(name);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonWeight)
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(pokemonImage).toHaveAttribute('src', image);
  });

  it('Contém um link de navegação para exibir detalhes do Pokémon.', () => {
    renderWithRouter(<App />);

    const { id } = pokemons[0];

    const linkToPokemonDetails = screen.getByRole('link', { name: /More details/i });

    expect(linkToPokemonDetails).toBeInTheDocument();
    expect(linkToPokemonDetails).toHaveAttribute('href', `/pokemons/${id}`);
  });

  it('Ao clicar no link de navegação do Pokémon, redireciona para a página '
  + 'de detalhes de Pokémon.', () => {
    const { history } = renderWithRouter(<App />);

    const { name, id } = pokemons[0];

    const linkToPokemonDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(linkToPokemonDetails);

    const titlePokemonDetails = screen
      .getByRole('heading', { level: 2, name: `${name} Details` });

    expect(titlePokemonDetails).toBeInTheDocument();
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('Existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { name, id } = pokemons[0];
    updateFavoritePokemons(id, true);

    renderWithRouter(<App />);

    const iconStar = screen.getByRole('img', { name: `${name} is marked as favorite` });

    expect(iconStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
