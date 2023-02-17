import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';

const userEmail = 'google@yahoo.com';

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    user: {
      email: userEmail,
    },
  }),
}));

test('renders navigation bar on the home page', async () => {
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>,
  );
  expect(await screen.findByRole('img', { name: /big bite logo/i })).toBeInTheDocument();
});
