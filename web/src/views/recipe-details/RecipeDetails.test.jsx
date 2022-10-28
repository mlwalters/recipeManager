import React from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import { render, screen } from '@testing-library/react';
import RecipeDetails from './RecipeDetails';

const userEmail = 'google@yahoo.com';
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    user: {
      email: userEmail,
    },
  }),
}));

const id = 2;
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id,
  }),
}));

const details = {
  id: 2,
  name: 'Lentil Soup',
  userEmail: 'hello@me.com',
  description: 'The touch of spices with lemon really lifts this soup to the next level.',
  servingSize: 6,
  category: 'Soup',
  notes: '',
  instructions: [
    {
      id: 3,
      step: 'Add garlic and onion, cook for 2 minutes.',
      stepNumber: 1,
    },
    {
      id: 4,
      step: 'Add celery and carrot.',
      stepNumber: 2,
    },
  ],
  ingredients: [
    {
      id: 4,
      amount: '1 tsp',
      name: 'salt',
    },
  ],
};

const mockGetDetails = () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe/${id}`).reply(200, details);
  render(
    <BrowserRouter>
      <RecipeDetails />
    </BrowserRouter>,
  );
};

test('renders details on the recipe details page', async () => {
  mockGetDetails();
  const title = await screen.findByRole('heading', {
    name: /lentil soup/i,
  });
  expect(title).toBeInTheDocument();
  expect(await screen.findByText(details.category)).toBeInTheDocument();
});

test('renders error if fetching recipe card fails', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe/${id}`).reply(500);
  render(
    <BrowserRouter>
      <RecipeDetails />
    </BrowserRouter>,
  );
  expect(await screen.findByText('Oops! Could not fetch recipe details.')).toBeInTheDocument();
});

test('renders button to print the recipe', async () => {
  mockGetDetails();
  expect(await screen.findByText(/print recipe/i)).toBeInTheDocument();
});

test('renders button to add ingredients to grocery list', async () => {
  mockGetDetails();
  expect(await screen.findByText(/add to grocery list/i)).toBeInTheDocument();
});
