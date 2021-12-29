import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen } from '@testing-library/react';
import RecipeDetails from './RecipeDetails';

const recipeDetails = {
  id: 2,
  name: 'Lentil Soup',
  description: 'The touch of spices and finishing it off with lemon really lifts this soup to the next level.',
  servingSize: 6,
  instructions: [
    {
      stepNumber: 1,
      step: 'Preheat oven to 160C/320F (standard) or 140C/295F (fan/convection)',
    },
    {
      stepNumber: 2,
      step: 'Butter and line the side of the pan.',
    },
  ],
  notes: '',
};

test('renders details on the recipe details page', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe/2`).reply(200, recipeDetails);
  render(<RecipeDetails />);
  expect(await screen.findByText(recipeDetails.name)).toBeInTheDocument();
  expect(await screen.findByText(recipeDetails.description)).toBeInTheDocument();
  expect(await screen.findByText(recipeDetails.servingSize)).toBeInTheDocument();
  expect(await screen.findByText(recipeDetails.instructions[0].step)).toBeInTheDocument();
  expect(await screen.findByText(recipeDetails.notes)).toBeInTheDocument();
});

test('renders error if fetching recipe card fails', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe/2`).reply(500);
  render(<RecipeDetails />);
  expect(await screen.findByText('Oops! Could not fetch recipe details.')).toBeInTheDocument();
});
