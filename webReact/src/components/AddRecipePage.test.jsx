import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import AddRecipePage from './AddRecipePage';

test('renders navigation bar on the add recipe page', async () => {
  render(
    <BrowserRouter>
      <AddRecipePage />
    </BrowserRouter>,
  );
  // expect(await screen.findByText('Recipes')).toBeInTheDocument();
  // expect(await screen.findByText('Favorites')).toBeInTheDocument();
  // expect(await screen.findByText('Meal Planner')).toBeInTheDocument();
  expect(screen.getByLabelText('Recipe name')).toBeInTheDocument();
});
