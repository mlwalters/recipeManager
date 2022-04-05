import React from 'react';
// import axios from 'axios';
// import { BrowserRouter } from 'react-router-dom';
// import MockAdapter from 'axios-mock-adapter';
import { render, screen } from '@testing-library/react';
import RecipeCard from './RecipeCard';

const userEmail = 'google@yahoo.com';
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    user: {
      email: userEmail,
    },
  }),
}));

const testRecipeCard = {
  title: 'Roasted Chicken',
  category: 'Poultry',
  description: 'Juicy and tasty',
};

test.only('renders card header', async () => {
  render(<RecipeCard />);
  expect(await screen.findByText(testRecipeCard.title)).toBeInTheDocument();
});
