import React from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import RecipeDetails from './RecipeDetails';

const userEmail = 'google@yahoo.com';
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    user: {
      email: userEmail,
    },
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

// TODO: Refactor using within or just change the render code
test('renders details on the recipe details page', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe/2`).reply(200, details);
  render(
    <BrowserRouter>
      <RecipeDetails />
    </BrowserRouter>,
  );
  // expect(await screen.findByText(details.name)).toBeInTheDocument();
  const title = screen.getByRole('heading', {
    name: /lentil soup/i,
  });
  expect(title).toBeInTheDocument();
  // expect(await screen.findByText(details.description)).toBeInTheDocument();
  // expect(await screen.findByText(details.servingSize)).toBeInTheDocument();
  // expect(await screen.findByText(details.category)).toBeInTheDocument();
  // expect(await screen.findByText(details.instructions[0].step)).toBeInTheDocument();
  // expect(await screen.findByText(recipeDetails.notes)).toBeInTheDocument();

  // const recipeName = await screen.findByText('Lentil Soup');
  // expect(recipeName).toBeInTheDocument();
  // const recipeDiv = recipeName.parentElement;
  // expect(await within(recipeDiv).findByText(details.description)).toBeInTheDocument();
});

test('renders loading before getting recipe details', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi
    .onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe/2`)
    .reply(() => new Promise((resolve) => setTimeout(() => resolve([200, []]), 500)));
  render(
    <BrowserRouter>
      <RecipeDetails />
    </BrowserRouter>,
  );
  const loadingText = await screen.findByText('Loading...');
  expect(loadingText).toBeInTheDocument();
  await waitForElementToBeRemoved(loadingText);
});

test('renders button to print the recipe', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe/2`).reply(200, details);
  render(
    <BrowserRouter>
      <RecipeDetails />
    </BrowserRouter>,
  );
  // expect(await screen.findByRole('button', { name: /print recipe/i })).toBeEnabled();
  expect(await screen.findByText(/print recipe/i)).toBeInTheDocument();
});

test('renders error if fetching recipe card fails', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe/2`).reply(500);
  render(
    <BrowserRouter>
      <RecipeDetails />
    </BrowserRouter>,
  );
  expect(await screen.findByText('Oops! Could not fetch recipe details.')).toBeInTheDocument();
});
