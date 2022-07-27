import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import data from '../data';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pokemon = data[0];
const pkmFavorited = 'Pokémon favoritado?';

describe(`Teste se as informações detalhadas do pokémon selecionado
são mostradas na tela`,
() => {
  test('A página deve conter um texto <name> Details, onde <name> é o nome do pokémon',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', { name: /More details/i });
      userEvent.click(moreDetails);
      const { name } = pokemon;
      const h2 = screen.getByRole(
        'heading', { name: `${name} Details` },
      );
      expect(h2).toBeInTheDocument();
    });

  test('Não deve existir o link de navegação para os detalhes do pokémon selecionado',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', { name: /More details/i });
      userEvent.click(moreDetails);
      expect(moreDetails).not.toBeInTheDocument();
    });

  test('A seção de detalhes deve conter um heading h2 com o texto \'Summary\'',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', { name: /More details/i });
      userEvent.click(moreDetails);
      const h2 = screen.getByRole('heading', { name: /Summary/i });
      expect(h2).toBeDefined();
    });

  test(`A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico
  sendo visualizado`,
  () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const { summary } = pokemon;
    const p = screen.getByText(summary);
    expect(p).toBeDefined();
  });
});

describe(`Teste se existe na página uma seção com os mapas contendo as localizações do
pokémon`,
() => {
  test(`Na seção de detalhes deverá existir um heading h2 com o texto
  'Game Locations of <name>'; onde <name> é o nome do pokémon exibido`,
  () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const { name } = pokemon;
    const h2 = screen.getByRole(
      'heading', { name: `Game Locations of ${name}` },
    );
    expect(h2).toBeInTheDocument();
  });

  test('Todas as localizações do pokémon devem ser mostradas na seção de detalhes',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', { name: /More details/i });
      userEvent.click(moreDetails);

      const { foundAt } = pokemon;
      foundAt.forEach(({ location }) => {
        const pokemonLocation = screen.getByText(location);
        expect(pokemonLocation).toBeInTheDocument();
      });
    });

  test(
    'Devem ser exibidos o nome da localização e uma imagem do mapa em cada localização',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', { name: /More details/i });
      userEvent.click(moreDetails);
      const { foundAt } = pokemon;
      foundAt.forEach(({ location, map }) => {
        expect(location).toBeDefined();
        expect(map).toBeDefined();
      });
    },
  );

  test('A imagem da localização deve ter um atributo src com a URL da localização',
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', { name: /More details/i });
      userEvent.click(moreDetails);
      const { name, foundAt } = pokemon;
      const maps = screen.getAllByAltText(`${name} location`);
      maps.forEach((map, index) => {
        expect(map).toHaveAttribute('src', foundAt[index].map);
      });
    });

  test(
    `A imagem da localização deve ter um atributo alt com o texto <name> location,
    onde <name> é o nome do pokémon`,
    () => {
      renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', { name: /More details/i });
      userEvent.click(moreDetails);
      const { name } = pokemon;
      const maps = screen.getAllByAltText(`${name} location`);
      expect(maps).toBeDefined();
    },
  );
});

describe('Teste se o usuário pode favoritar um pokémon através da página de detalhes',
  () => {
    test('A página deve exibir um checkbox que permite favoritar o pokémon',
      () => {
        renderWithRouter(<App />);
        const moreDetails = screen.getByRole('link', { name: /More details/i });
        userEvent.click(moreDetails);
        const favorite = screen.getByLabelText(pkmFavorited);
        expect(favorite).toBeInTheDocument();
      });
    test(
      `Cliques alternados no checkbox devem adicionar e remover respectivamente o pokémon
      da lista de favoritos`,
      () => {
        renderWithRouter(<App />);
        const { name } = pokemon;
        const moreDetails = screen.getByRole('link', { name: /More details/i });
        userEvent.click(moreDetails);
        const favorite = screen.getByLabelText(pkmFavorited);
        userEvent.click(favorite);
        const pokemonImg = screen.getByAltText(`${name} is marked as favorite`);
        expect(pokemonImg).toHaveAttribute('src', '/star-icon.svg');
      },
    );

    test('O label do checkbox deve conter o texto \'Pokémon favoritado?\'',
      () => {
        renderWithRouter(<App />);
        const moreDetails = screen.getByRole('link', { name: /More details/i });
        userEvent.click(moreDetails);
        const checkbox = screen.getByLabelText(pkmFavorited);
        expect(checkbox).toBeInTheDocument();
      });
  });
