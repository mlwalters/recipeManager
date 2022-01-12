import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

test('renders recipe dashboard on the home page', async () => {
  render(<Dashboard />);
  expect(await screen.findByText('Favorites')).toBeInTheDocument();
  expect(await screen.findByText('Meal Planner')).toBeInTheDocument();
});

// test('renders error if fetching recipe fails', async () => {
//   const mockApi = new MockAdapter(axios);
//   mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(500);
//   render(<Recipe />);
//   expect(await screen.findByText('Oops! Could not fetch recipe details.')).toBeInTheDocument();
// });
