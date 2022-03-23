import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const redirectOnClickLink = (titleLink, path) => {
  const { history } = renderWithRouter(<App />);

  const link = screen.getByRole('link', { name: titleLink });
  userEvent.click(link);

  expect(history.location.pathname).toBe(path);
};

describe('Testa o componnte App.js', () => {
  it('Contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />);

    const topBarNavigation = screen.getByRole('navigation');

    const linkToHome = within(topBarNavigation)
      .getByRole('link', { name: /Home/i });
    const linkToAbout = within(topBarNavigation)
      .getByRole('link', { name: /About/i });
    const linkToFavorites = within(topBarNavigation)
      .getByRole('link', { name: /Favorite Pokémons/i });

    expect(linkToHome).toBeInTheDocument();
    expect(linkToAbout).toBeInTheDocument();
    expect(linkToFavorites).toBeInTheDocument();
  });

  it('Redireciona para a página inicial ao clicar no link "Home".', () => {
    redirectOnClickLink(/Home/i, '/');
  });

  it('Redireciona para a página de About ao clicar no link "About".', () => {
    redirectOnClickLink(/About/i, '/about');
  });

  it('Redireciona para a página de Pokémons Favoritados ao clicar no'
  + 'link "Favorite Pokémons".', () => {
    redirectOnClickLink(/Favorite Pokémons/i, '/favorites');
  });

  it('Redireciona para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/Non-existent url');

    const titleNotFound = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i });

    expect(titleNotFound).toBeInTheDocument();
  });
});
