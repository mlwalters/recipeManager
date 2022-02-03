import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import LandingPage from './LandingPage';

test('renders recipe dashboard on the home page', async () => {
  render(
    <BrowserRouter>
      <LandingPage />
    </BrowserRouter>,
  );
  expect(await screen.findByText('This is the landing page')).toBeInTheDocument();
});
