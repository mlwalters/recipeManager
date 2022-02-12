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
  expect(await screen.findByRole('link', { name: /logo/i })).toBeInTheDocument();
  expect(await screen.findByRole('link', { name: /my recipes/i })).toBeInTheDocument();
  expect(await screen.findByText(/favorites/i)).toBeInTheDocument();
  expect(await screen.findByText(/shopping list/i)).toBeInTheDocument();
  // expect(await screen.findByAltText(/account settings/i));
});
