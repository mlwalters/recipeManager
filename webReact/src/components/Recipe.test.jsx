import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen } from '@testing-library/react';
import Recipe from './Recipe';

const recipeDetails = {
  name: 'Strawberry Cheesecake',
  description: 'A light-yet-rich cheesecake, creamy but not dense-creamy like New York cheesecake.',
  servingSize: 12,
  notes: 'This is my favorite cheesecake recipe.',
};

test('renders recipe details', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(200, recipeDetails);
  render(<Recipe />);
  expect(await screen.findByText(recipeDetails.name)).toBeInTheDocument();
  expect(await screen.findByText(recipeDetails.description)).toBeInTheDocument();
  expect(await screen.findByText(recipeDetails.servingSize)).toBeInTheDocument();
  expect(await screen.findByText(recipeDetails.notes)).toBeInTheDocument();
});

test('renders error if fetching recipe fails', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(500);
  render(<Recipe />);
  expect(await screen.findByText('Oops! Could not fetch recipe details.')).toBeInTheDocument();
});
