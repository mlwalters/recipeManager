import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// import { BrowserRouter } from 'react-router';

import {
  render, screen,
} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import AddRecipeForm from './AddRecipeForm';
// import AddRecipePage from './AddRecipePage';
// import NavBar from './sharedComponents/NavBar';

const testRecipes = [
  {
    id: 1,
    name: 'Strawberry Cheesecake',
    description: 'A light-yet-rich cheesecake, creamy but not dense-creamy like New York cheesecake.',
    servingSize: 12,
    category: 'Dessert',
    notes: 'This is my favorite cheesecake recipe.',
    instructions: [
      {
        id: 1,
        step: 'Preheat oven to 160C/320F.',
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
    description: 'Saute ingredients.',
    servingSize: 6,
    category: 'Soup',
    notes: '',
    instructions: [
      {
        id: 3,
        step: 'Heat oil in a large pot over medium heat.',
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
  },
];

const testCategory = [
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
  {
    id: 4,
    name: 'Soup',
  },
  {
    id: 5,
    name: 'Dessert',
  },
];

// const addedRecipe = {
//   id: 213, name: 'Mushroom Risotto',
//   description: '',
//   notes: 'Use dried mushrooms for extra flavor',
// };

// const clickToAddRecipe = async () => {
//   const addButton = await screen.findByRole('button', { name: 'Add Recipe' });
//   userEvent.click(addButton);
// };

// test('renders the form to add recipe when the page loads', async () => {
//   render(
//     <BrowserRouter>
//       <AddRecipeForm />
//     </BrowserRouter>,
//   );
// describe('when form is rendered', () => {
//   beforeEach(async () => {
//     const mockApi = new MockAdapter(axios);
//     mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(200, testRecipes);
//     mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Category`).reply(200, testCategory);
//   });

test('input fields to add a new recipe are displayed', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(200, testRecipes);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Category`).reply(200, testCategory);
  // mockApi.onPost(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(201, addedRecipe);
  render(
    <AddRecipeForm />,
  );
  expect(await screen.findByTestId('Recipe name')).toBeInTheDocument();
  expect(await screen.findByTestId('Description')).toBeInTheDocument();
  expect(await screen.findByTestId('Category')).toBeInTheDocument();
  expect(await screen.findByTestId('Serving Size')).toBeInTheDocument();
  // expect(await screen.findByDisplayValue('Beef')).toBeInTheDocument();
});
// });
