import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen } from '@testing-library/react';
import Recipe from './Recipe';

const recipeDashboard = ['Favorites', 'Meal Planner', 'Shopping List'];

test('renders recipe dashboard on the home page', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(200, recipeDashboard);
  render(<Recipe />);
  expect(await screen.findByText(recipeDashboard[0])).toBeInTheDocument();
  expect(await screen.findByText(recipeDashboard[1])).toBeInTheDocument();
});

// test('renders error if fetching recipe fails', async () => {
//   const mockApi = new MockAdapter(axios);
//   mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(500);
//   render(<Recipe />);
//   expect(await screen.findByText('Oops! Could not fetch recipe details.')).toBeInTheDocument();
// });
