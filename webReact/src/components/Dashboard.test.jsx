import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

test('renders recipe dashboard on the home page', async () => {
  render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>,
  );
  expect(await screen.findByText('Favorites')).toBeInTheDocument();
  expect(await screen.findByText('Meal Planner')).toBeInTheDocument();
});
