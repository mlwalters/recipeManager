import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';

test('renders navigation bar on the home page', async () => {
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>,
  );
  expect(await screen.findByText('LOGO')).toBeInTheDocument();
  expect(await screen.findByText('Add Recipe')).toBeInTheDocument();
  expect(await screen.findByText('Favorites')).toBeInTheDocument();
  expect(await screen.findByText('Meal Planner')).toBeInTheDocument();
});
