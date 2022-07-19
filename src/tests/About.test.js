import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testes acerca da página \'About\'',
  () => {
    test('Teste se a página contém um heading h2 com o texto \'About Pokédex\'', () => {
      renderWithRouter(<App />);
      const linkAbout = screen.getByRole('link', { name: /about/i });
      userEvent.click(linkAbout);
      const heading2 = screen.getByRole('heading', { name: /About Pokédex/i });

      expect(heading2).toHaveTextContent(/About Pokédex/i);
    });

    test('Teste se a página contém dois parágrafos com texto sobre a Pokédex',
      () => {
        renderWithRouter(<App />);
        const linkAbout = screen.getByRole('link', { name: /about/i });
        userEvent.click(linkAbout);

        expect(screen.getByText(
          /This application simulates a Pokédex/i,
        )).toBeInTheDocument();

        expect(screen.getByText(
          /One can filter Pokémons by type,/i,
        )).toBeInTheDocument();
      });

    test('Testa se existe uma imagem específica',
      () => {
        renderWithRouter(<App />);
        const linkAbout = screen.getByRole('link', { name: /about/i });
        userEvent.click(linkAbout);

        expect(screen.getByAltText(
          /Pokédex/i,
        )).toBeInTheDocument();
      });
  });
