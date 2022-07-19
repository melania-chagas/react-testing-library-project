import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../pages';

describe('Testes acerca da página \'About\'',
  () => {
    test('Teste se a página contém um heading h2 com o texto \'About Pokédex\'', () => {
      render(<About />);
      const heading2 = screen.getByRole('heading', { name: /About Pokédex/i });

      expect(heading2).toHaveTextContent(/About Pokédex/i);
    });

    test('Teste se a página contém dois parágrafos com texto sobre a Pokédex',
      () => {
        render(<About />);

        expect(screen.getByText(
          /This application simulates a Pokédex/i,
        )).toBeInTheDocument();

        expect(screen.getByText(
          /One can filter Pokémons by type,/i,
        )).toBeInTheDocument();
      });

    test('Testa se existe uma imagem específica',
      () => {
        render(<About />);
        const img = screen.getByRole('img', { name: /Pokédex/i });
        const urlImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
        expect(img).toHaveAttribute('src', urlImg);
      });
  });
