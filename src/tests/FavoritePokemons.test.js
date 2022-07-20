import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../pages';

describe('Testes acerca da página \'FavoritePokemons\'', () => {
  test(
    `Verifica se é exibida na tela a mensagem 'No favorite pokemon found',
      caso a pessoa não tenha pokémons favoritos`,
    () => {
      render(<FavoritePokemons />);
      const noFavorites = screen.getByText(/ favorite pokemon found/i);
      expect(noFavorites).toBeInTheDocument();
    },
  );

  test('Verifica se são exibidos todos os cards de pokémons favoritados',
    () => {
      render(<FavoritePokemons />);
      const { container } = render(<FavoritePokemons />);
      const allfavorite = container.getElementsByClassName('favorite-pokemon');
      expect(allfavorite).toBeDefined();
    });
});
