import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen } from '@testing-library/react';
import RecipeCard from './RecipeCard';

const recipeCardDetails = [{
  id: 1,
  name: 'Strawberry Cheesecake',
  description: 'A light-yet-rich cheesecake, creamynot dense-creamy like New York cheesecake.',
  servingSize: 12,
  notes: 'This is my favorite cheesecake recipe.',
},
{
  id: 2,
  name: 'Lentil Soup',
  description: 'The touch of spices with lemon really lifts this soup to the next level.',
  servingSize: 6,
  notes: '',
}];

test('renders recipe details preview as a card on the dashboard', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(200, recipeCardDetails);
  render(<RecipeCard />);
  expect(await screen.findByText(recipeCardDetails[0].name)).toBeInTheDocument();
  expect(await screen.findByText(recipeCardDetails[0].description)).toBeInTheDocument();
  expect(await screen.findByText(recipeCardDetails[0].category)).toBeInTheDocument();
});

test('renders error if fetching recipe card fails', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(500);
  render(<RecipeCard />);
  expect(await screen.findByText('Oops! Could not fetch recipe card.')).toBeInTheDocument();
});
