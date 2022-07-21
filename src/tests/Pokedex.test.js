import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes acerca da página \'Pokedex\'', () => {
  test(
    `Verifica se a página contém um heading h2 com o texto
    'Encountered pokémons'`,
    () => {
      renderWithRouter(<App />);
      const h2 = screen.getByRole(
        'heading', { name: /Encountered pokémons/i },
      );
      expect(h2).toHaveTextContent(/Encountered pokémons/i);
    },
  );

  test(
    `Verifica se é exibido o próximo pokémon da lista quando o botão
    'Próximo pokémon' é clicado'`,
    () => {
      const { getByTestId } = renderWithRouter(<App />);
      const nextPokemonButton = getByTestId('next-pokemon');
      userEvent.click(nextPokemonButton);
      expect(screen.getByText(/Charmander/i)).toBeInTheDocument();
    },
  );

  describe('Verifica se a Pokédex tem os botões de filtro',
    () => {
      test('Verifica se existe o botão "All"',
        () => {
          renderWithRouter(<App />);
          const buttonAll = screen.getByRole('button', { name: /All/i });
          expect(buttonAll).toBeInTheDocument();
        });

      test(
        `Verifica se existe um botão de filtragem para cada tipo de pokémon,
          sem repetição`,
        () => {
          renderWithRouter(<App />);
          const types = [
            'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
          ];
          types.forEach((type) => {
            const button = screen.getByRole('button', { name: type });
            expect(button).toBeInTheDocument();
          });
        },
      );

      test(
        `A partir da seleção de um botão de tipo, a Pokédex deve circular somente
          pelos pokémons daquele tipo`,
        () => {
          renderWithRouter(<App />);
          const types = [
            'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
          ];
          const nextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
          types.forEach((type) => {
            const button = screen.getByRole('button', { name: type });
            userEvent.click(button);
            expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
            userEvent.click(nextPokemon);
            expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
          });
        },
      );

      describe('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
        test('O texto do botão deve ser "All"',
          () => {
            renderWithRouter(<App />);
            const buttonAll = screen.getByRole('button', { name: /All/i });
            expect(buttonAll).toHaveTextContent(/All/i);
          });

        test(`A Pokedéx deverá mostrar os pokémons normalmente (sem filtros)
          quando o botão All for clicado`,
        () => {
          renderWithRouter(<App />);
          const buttonAll = screen.getByRole('button', { name: /All/i });
          userEvent.click(buttonAll);
          const allPokemons = [
            'Pikachu',
            'Charmander',
            'Caterpie',
            'Ekans',
            'Alakazam',
            'Mew',
            'Rapidash',
            'Snorlax',
            'Dragonair',
          ];
          allPokemons.forEach((pokemon) => {
            const nextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
            userEvent.click(nextPokemon);
            expect(pokemon).toBeDefined();
          });
        });
      });
    });
  test('Testando o pokemon-type-button',
    () => {
      renderWithRouter(<App />);
      const allByTestId = screen.getAllByTestId('pokemon-type-button');
      const types = [
        'Electric',
        'Fire',
        'Bug',
        'Poison',
        'Psychic',
        'Normal',
        'Dragon',
      ];
      types.forEach((type, index) => {
        expect(allByTestId[index].innerHTML).toBe(type);
      });
    });
});
