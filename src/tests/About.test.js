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
  });
