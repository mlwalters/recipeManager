import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import RecipeCardList from './RecipeCardList';

const recipeCardDetails = [{
  id: 1,
  name: 'Strawberry Cheesecake',
  description: 'A light-yet-rich cheesecake, creamynot dense-creamy like New York cheesecake.',
  servingSize: 12,
  category: 'Dessert',
  instructions: [
    {
      id: 1,
      step: 'Preheat oven to 160C/320F (standard) or 140C/295F (fan/convection).',
      stepNumber: 1,
    },
    {
      id: 2,
      step: 'Butter and line the side of the pan.',
      stepNumber: 2,
    },
  ],
  ingredients: [
    {
      id: 1,
      amount: '1/2 tsp',
      name: 'salt',
    },
    {
      id: 2,
      amount: '1 cup',
      name: 'sugar',
    },
  ],
},
{
  id: 2,
  name: 'Lentil Soup',
  description: 'The touch of spices with lemon really lifts this soup to the next level.',
  servingSize: 6,
  category: 'Soup',
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
      id: 3,
      amount: '3 cups',
      name: 'brown lentils',
    },
    {
      id: 4,
      amount: '1 tsp',
      name: 'salt',
    },
  ],
}];

const categories = [
  {
    id: 0,
    name: 'Seafood',
  },
  {
    id: 1,
    name: 'Beef',
  },
  {
    id: 2,
    name: 'Pork',
  },
  {
    id: 3,
    name: 'Poultry',
  },
];

test('renders recipe details preview as a card on the home page', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(200, recipeCardDetails);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Category`).reply(200, categories);
  render(<RecipeCardList />);
  // expect(await screen.findByText(recipeCardDetails[0].name)).toBeInTheDocument();
  expect(await screen.findByRole('heading', { name: /strawberry cheesecake/i })).toBeInTheDocument();
  expect(await screen.findByText(recipeCardDetails[0].category)).toBeInTheDocument();
  expect(await screen.findByText(recipeCardDetails[0].description)).toBeInTheDocument();
});

test('renders error if fetching recipe card fails', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(200, recipeCardDetails);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(500);
  render(<RecipeCardList />);
  expect(await screen.findByText('Oops! Could not fetch recipe card.')).toBeInTheDocument();
});

test('renders loading before getting recipe cards list', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Category`).reply(200, categories);
  mockApi
    .onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`)
    .reply(() => new Promise((resolve) => setTimeout(() => resolve([200, null]), 5000)));
  render(<RecipeCardList />);
  const loadingText = await screen.findByText('Loading...');
  expect(loadingText).toBeInTheDocument();
});
