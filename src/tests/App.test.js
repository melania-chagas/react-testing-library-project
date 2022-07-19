import React from 'react';
import { screen } from '@testing-library/react';
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
