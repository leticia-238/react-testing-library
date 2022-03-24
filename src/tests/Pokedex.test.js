import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemonTypes = [...new Set(pokemons.map(({ type }) => type))];

const showPokemon = (pokemonName) => {
  const pokemon = screen.getByTestId('pokemon-name');
  expect(pokemon).toHaveTextContent(pokemonName);
};

describe('Testa o componente Pokedex.js', () => {
  beforeEach(() => { renderWithRouter(<App />); });

  it('Contém um heading h2 com o texto "Encountered pokémons".', () => {
    const titlePokedex = screen
      .getByRole('heading', { level: 2, name: /Encountered pokémons/i });

    expect(titlePokedex).toBeInTheDocument();
  });

  it('Exibe o próximo Pokémon da lista quando o botão "Próximo pokémon" é '
  + 'clicado.', () => {
    // O botão deve conter o texto Próximo pokémon;
    const buttonNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });

    pokemons.forEach((pokemon, index) => {
      // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
      showPokemon(pokemon.name);
      userEvent.click(buttonNextPokemon);

      // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
      if (index === pokemons.length - 1) {
        showPokemon(pokemons[0].name);
      }
    });
  });

  it('Mostra apenas um Pokémon por vez.', () => {
    const buttonNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });

    pokemons.forEach(() => {
      userEvent.click(buttonNextPokemon);
      const showPokemons = screen.getAllByTestId('pokemon-name');
      expect(showPokemons).toHaveLength(1);
    });
  });

  it('Tem os botões de filtro.', () => {
    const buttonNextPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });

    // Contém um botão para resetar o filtro
    const buttonAll = screen.getByRole('button', { name: /All/i });
    const buttonsFilter = screen.getAllByTestId('pokemon-type-button');

    // O botão All precisa estar sempre visível.
    expect(buttonAll).toBeInTheDocument();

    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    expect(buttonsFilter).toHaveLength(pokemonTypes.length);

    pokemonTypes.forEach((type, index) => {
      // O texto do botão deve corresponder ao nome do tipo, ex. Psychic;
      expect(buttonsFilter[index]).toHaveTextContent(type);

      userEvent.click(buttonsFilter[index]);
      const pokemonsByType = pokemons.filter((pokemon) => pokemon[type]);

      // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
      pokemonsByType.forEach((pokemon) => {
        userEvent.click(buttonNextPokemon);
        showPokemon(pokemon.name);
      });
    });

    // A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;
    userEvent.click(buttonAll);

    pokemons.forEach((pokemon) => {
      showPokemon(pokemon.name);
      userEvent.click(buttonNextPokemon);
    });
  });
});
