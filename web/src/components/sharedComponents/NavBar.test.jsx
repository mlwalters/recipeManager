import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
import NavBar from './NavBar';

test('renders navigation bar on the home page', async () => {
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>,
  );
  expect(await screen.findByRole('link', { name: /logo/i }));
  expect(await screen.findByRole('link', { name: /my recipes/i }));
  expect(await screen.findByText(/favorites/i));
  expect(await screen.findByText(/shopping list/i));
  // expect(await screen.findByAltText(/account settings/i));
});
