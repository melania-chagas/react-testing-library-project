import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Verifica se o topo da aplicaçao contém um conjunto fixo de links de navegação',
  () => {
    test('O primeiro link deve possuir o texto \'Home\'', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/Home');
      const linkHome = screen.getByRole('link', { name: /Home/i });
      expect(linkHome).toBeDefined();
    });

    test('O segundo link deve possuir o texto \'About\'', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/About');
      const linkAbout = screen.getByRole('link', { name: /About/i });
      expect(linkAbout).toBeDefined();
    });

    test('O terceiro link deve possuir o texto \'Favorite Pokémons\'', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/Favorite Pokémons');
      const linkFavPokémons = screen.getByRole('link', { name: /Favorite Pokémons/i });
      expect(linkFavPokémons).toBeDefined();
    });
  });

describe('Testa a navegação entre as páginas',
  () => {
    test('Ao clicar no link \'Home\' a aplicação é redirecionada para a url \'/\' ',
      () => {
        const { history } = renderWithRouter(<App />);
        const linkHome = screen.getByRole('link', { name: /Home/i });
        userEvent.click(linkHome);
        const { location: { pathname } } = history;

        expect(pathname).toBe('/');
      });

    test('Ao clicar no link \'About\' a aplicação é redirecionada para a url \'/about\' ',
      () => {
        const { history } = renderWithRouter(<App />);
        const linkAbout = screen.getByRole('link', { name: /about/i });
        userEvent.click(linkAbout);
        const { location: { pathname } } = history;

        expect(pathname).toBe('/about');
      });

    test(`Ao clicar no link 'Favorite Pokémons' a aplicação é redirecionada para a url
      '/favorites' `,
    () => {
      const { history } = renderWithRouter(<App />);
      const linkFavorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
      userEvent.click(linkFavorites);
      const { location: { pathname } } = history;

      expect(pathname).toBe('/favorites');
    });

    test(`Verifica se a aplicação é redirecionada para a página 'Not Found'
    ao entrar em uma URL desconhecida.`,
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/páginaNãoExistente');
      expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
    });
  });
