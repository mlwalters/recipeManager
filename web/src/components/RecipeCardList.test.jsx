import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import RecipeCardList from './RecipeCardList';
// import Dashboard from './Dashboard';

// const recipeCardDetails = [{
//   id: 1,
//   name: 'Strawberry Cheesecake',
//   description: 'A light-yet-rich cheesecake, creamynot dense-creamy like New York cheesecake.',
//   servingSize: 12,
//   category: 'Dessert',
//   instructions: [
//     {
//       id: 1,
//       step: 'Preheat oven to 160C/320F (standard) or 140C/295F (fan/convection).',
//       stepNumber: 1,
//     },
//     {
//       id: 2,
//       step: 'Butter and line the side of the pan.',
//       stepNumber: 2,
//     },
//   ],
//   ingredients: [
//     {
//       id: 1,
//       amount: '1/2 tsp',
//       name: 'salt',
//     },
//     {
//       id: 2,
//       amount: '1 cup',
//       name: 'sugar',
//     },
//   ],
// },
// {
//   id: 2,
//   name: 'Lentil Soup',
//   description: 'The touch of spices with lemon really lifts this soup to the next level.',
//   servingSize: 6,
//   category: 'Soup',
//   instructions: [
//     {
//       id: 3,
//       step: 'Add garlic and onion, cook for 2 minutes.',
//       stepNumber: 1,
//     },
//     {
//       id: 4,
//       step: 'Add celery and carrot.',
//       stepNumber: 2,
//     },
//   ],
//   ingredients: [
//     {
//       id: 3,
//       amount: '3 cups',
//       name: 'brown lentils',
//     },
//     {
//       id: 4,
//       amount: '1 tsp',
//       name: 'salt',
//     },
//   ],
// }];

// test('renders recipe details preview as a card on the dashboard', async () => {
//   const mockApi = new MockAdapter(axios);
//   mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(200, recipeCardDetails);
//   render(<RecipeCardList />);
//   expect(await screen.findByText(recipeCardDetails[0].name)).toBeInTheDocument();
//   expect(await screen.findByText(recipeCardDetails[0].description)).toBeInTheDocument();
//   expect(await screen.findByText(recipeCardDetails[0].category)).toBeInTheDocument();
// });

test('renders error if fetching recipe card fails', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(500);
  render(<RecipeCardList />);
  expect(await screen.findByText('Oops! Could not fetch recipe card.')).toBeInTheDocument();
});

// test('renders loading before getting practice member list', async () => {
//   const mockApi = new MockAdapter(axios);
//   mockApi
//     .onGet(`${process.env.REACT_APP_BASE_API}/api/PracticeMembers`)
//     .reply(() => new Promise((resolve) => setTimeout(() => resolve([200, null]), 5000)));
//   render(<RecipeCardList />);
//   const loadingText = await screen.findByText('Loading...');
//   expect(loadingText).toBeInTheDocument();
// });