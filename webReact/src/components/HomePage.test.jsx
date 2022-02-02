import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

test('renders recipe dashboard on the home page', async () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>,
  );
  expect(await screen.findByText('Strawberry Cheesecake')).toBeInTheDocument();
});
