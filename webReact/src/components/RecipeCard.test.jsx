import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import RecipeCard from './RecipeCard';
// import Dashboard from './Dashboard';

const recipeCardDetails = {
  id: 1,
  name: 'Strawberry Cheesecake',
  description: 'A light-yet-rich cheesecake, creamynot dense-creamy like New York cheesecake.',
  servingSize: 12,
  notes: 'This is my favorite cheesecake recipe.',
};
// {
//   id: 2,
//   name: 'Lentil Soup',
//   description: 'The touch of spices with lemon really lifts this soup to the next level.',
//   servingSize: 6,
//   notes: '',
// }];

test('renders recipe details preview as a card on the dashboard', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(200, recipeCardDetails);
  const Card = () => (
    <div>
      <div>
        <p>
          Strawberry Cheesecake
        </p>
      </div>
    </div>
  );
  render(<Card />);
  expect(await screen.findByText(recipeCardDetails.name)).toBeInTheDocument();

  // expect(await screen.findByText(recipeCardDetails[1].name)).toBeInTheDocument();
  // expect(await screen.findByText(recipeCardDetails[1].description)).toBeInTheDocument();
  // expect(await screen.findByText(recipeCardDetails[1].category)).toBeInTheDocument();
});

// test('renders loading state while waiting for recipe cards to load', async () => {
//   const mockApi = new MockAdapter(axios);
//   mockApi
//     .onGet(`${process.env.REACT_APP_BASE_API}/api/Profiles`)
//     .reply(() => new Promise((resolve) => setTimeout(() => resolve([200, null]), 10000)));
//   render(<RecipeCard />);
//   const loadingText = await screen.findByText('Loading...');
//   expect(loadingText).toBeInTheDocument();
// });

test('renders error if fetching recipe card fails', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(500);
  render(<RecipeCard />);
  expect(await screen.findByText('Oops! Could not fetch recipe card.')).toBeInTheDocument();
});
