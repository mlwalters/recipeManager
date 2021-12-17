import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen } from '@testing-library/react';
import RecipeDetails from './RecipeDetails';

const recipeDetails = {
  id: 2,
  name: 'Lentil Soup',
  description: 'The touch of spices with lemon really lifts this soup to the next level.',
  servingSize: 6,
  notes: '',
};

test('renders details on the recipe details page', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe/2`).reply(200, recipeDetails);
  render(<RecipeDetails />);
  expect(await screen.findByText(recipeDetails.name)).toBeInTheDocument();
  expect(await screen.findByText(recipeDetails.description)).toBeInTheDocument();
  expect(await screen.findByText(recipeDetails.servingSize)).toBeInTheDocument();
  expect(await screen.findByText(recipeDetails.notes)).toBeInTheDocument();
});

// test('renders error if fetching recipe card fails', async () => {
//   const mockApi = new MockAdapter(axios);
//   mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(500);
//   render(<RecipeCard />);
//   expect(await screen.findByText('Oops! Could not fetch recipe card.')).toBeInTheDocument();
// });
