import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages';

describe('Testes acerca da página \'NotFound\'', () => {
  test(
    `Verifica se a página contém um heading h2 com o texto
    'Page requested not found 😭'`,
    () => {
      render(<NotFound />);
      const h2 = screen.getByRole(
        'heading', { name: /Page requested not found Crying emoji/i },
      );
      expect(h2).toHaveTextContent(/Page requested not found 😭/i);
    },
  );

  test('Verifica se existe uma imagem específica na tela',
    () => {
      render(<NotFound />);
      const img = screen.getByRole('img',
        { name: /Pikachu crying because the page requested was not found/i });
      const urlImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
      expect(img).toHaveAttribute('src', urlImg);
    });
});
