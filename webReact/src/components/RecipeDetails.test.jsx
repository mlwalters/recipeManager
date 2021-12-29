import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen } from '@testing-library/react';
import RecipeDetails from './RecipeDetails';

const recipeDetails = {
  id: 1,
  name: 'Strawberry Cheesecake',
  description: 'A light-yet-rich cheesecake, creamynot dense-creamy like New York cheesecake.',
  servingSize: 12,
  notes: 'This is my favorite cheesecake recipe.',
};

test('renders details on the recipe details page', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe/1`).reply(200, recipeDetails);
  render(<RecipeDetails />);
  expect(await screen.findByText(recipeDetails.name)).toBeInTheDocument();
  // expect(await screen.findByText(recipeDetails.description)).toBeInTheDocument();
  // expect(await screen.findByText(recipeDetails.servingSize)).toBeInTheDocument();
  // expect(await screen.findByText(recipeDetails.instructions[0].step)).toBeInTheDocument();
  // expect(await screen.findByText(recipeDetails.notes)).toBeInTheDocument();
});

test('renders error if fetching recipe card fails', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe/1`).reply(500);
  render(<RecipeDetails />);
  expect(await screen.findByText('Oops! Could not fetch recipe details.')).toBeInTheDocument();
});
