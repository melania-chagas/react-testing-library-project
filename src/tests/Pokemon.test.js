import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import data from '../data';
import App from '../App';

const pokemon = data[0];
const moreDetails = 'More details';

describe(`Teste se é renderizado um card com as informações de
  determinado pokémon`, () => {
  test('O nome correto do pokémon deve ser mostrado na tela',
    () => {
      renderWithRouter(<App />);
      const { name } = pokemon;

      expect(name).toBeDefined();
    });

  test('O tipo correto do pokémon deve ser mostrado na tela',
    () => {
      renderWithRouter(<App />);
      const { type } = pokemon;
      const typePokemon = screen.getByTestId('pokemon-type');

      expect(typePokemon).toHaveTextContent(type);
    });

  test(
    `O peso médio do pokémon deve ser exibido com um texto no formato
      Average weight: <value> <measurementUnit>; onde
        <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e
          sua unidade de medida`,
    () => {
      renderWithRouter(<App />);
      const { value, measurementUnit } = pokemon.averageWeight;
      const weight = screen.getByTestId('pokemon-weight');

      expect(weight).toHaveTextContent(
        `Average weight: ${value} ${measurementUnit}`,
      );
    },
  );

  test(`A imagem do pokémon deve ser exibida. Ela deve conter um atributo src
    com a URL da imagem e um atributo alt com o texto <name> sprite,
    onde <name> é o nome do pokémon`,
  () => {
    renderWithRouter(<App />);
    const { name, image } = pokemon;
    const altImg = screen.getByAltText(`${name} sprite`);

    expect(altImg).toBeDefined();
    expect(altImg).toHaveAttribute('src', image);
  });

  test(`Teste se o card do pokémon indicado na Pokédex contém um link de navegação
    para exibir detalhes deste pokémon. O link deve possuir a URL /pokemons/<id>,
    onde <id> é o id do pokémon exibido`,
  () => {
    renderWithRouter(<App />);
    const { id } = pokemon;
    const link = screen.getByRole('link', { name: moreDetails });
    expect(link).toHaveAttribute('href', `/pokemons/${id}`);
  });

  test(`Teste se ao clicar no link de navegação do pokémon, é feito o redirecionamento
    da aplicação para a página de detalhes de pokémon`,
  () => {
    const { history } = renderWithRouter(<App />);
    const { id } = pokemon;
    const details = screen.getByRole('link', { name: moreDetails });
    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test(`Teste se existe um ícone de estrela nos pokémons favoritados:
  O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg`,
  () => {
    renderWithRouter(<App />);
    const { name } = pokemon;
    const details = screen.getByRole('link', { name: moreDetails });
    userEvent.click(details);
    const favorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favorite);
    const pokemonImg = screen.getByAltText(`${name} is marked as favorite`);
    expect(pokemonImg).toBeDefined();
    expect(pokemonImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
