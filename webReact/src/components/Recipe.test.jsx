import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen } from '@testing-library/react';
import Recipe from './Recipe';

// REMEMBER THE TESTS ACTUALLY REFLECT  WHAT'S IN YOUR COMPONENT FILE
const recipeDetails = {
  name: 'Strawberry Cheesecake',
};

test('renders recipe name', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(200, recipeDetails);
  render(<Recipe />);
  expect(await screen.findByText(recipeDetails.name)).toBeInTheDocument();
});

test('renders error if fetching recipe name fails', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(500);
  render(<Recipe />);
  expect(await screen.findByText('Oops! Could not fetch recipe details.')).toBeInTheDocument();
});
