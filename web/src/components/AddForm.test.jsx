import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router';
import {
  render, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import AddForm from './AddForm';

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

const addedRecipe = {
  id: 213,
  name: 'Mushroom Risotto',
  description: '',
  category: 2,
  notes: 'Use dried mushrooms for extra flavor',
  ingredients: [
    {
      id: 1, item: 'mushroom',
    },
    {
      id: 2, item: 'rice',
    },
  ],
};

// test('input fields to add a new recipe are displayed', async () => {
//   const mockApi = new MockAdapter(axios);
//   mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(200, testRecipes);
//   mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Category`).reply(200, testCategory);
//   mockApi.onPost(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(201, addedRecipe);
//   render(
//     <AddForm />,
//   );
//   expect(await screen.findByRole('heading', { name: /add a new recipe/i })).toBeInTheDocument();
//   expect(await screen.findByTestId('Recipe name')).toBeInTheDocument();
//   expect(await screen.findByTestId('Description')).toBeInTheDocument();
//   expect(await screen.findByTestId('Category')).toBeInTheDocument();
//   expect(await screen.findByTestId('Serving Size')).toBeInTheDocument();
// });

// test('if the required fields are entered, the add recipe button becomes enabled', async () => {
//   const mockApi = new MockAdapter(axios);
//   mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(200, testRecipes);
//   mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Category`).reply(200, testCategory);
//   mockApi.onPost(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(201, addedRecipe);
//   render(
//     // <BrowserRouter>
//     <AddForm />,
//     // </BrowserRouter>,
//   );
//   expect(await screen.findByRole('button', { name: /add recipe/i })).toBeDisabled();
//   userEvent.type(await screen.findByPlaceholderText(/recipe name/i), testRecipes.name);
//   userEvent.type(await screen.findByPlaceholderText(/category/i), addedRecipe.category);
//   expect(await screen.findByRole('button', { name: /add recipe/i })).toBeEnabled();
// });

describe('when add recipe form is rendered', () => {
  beforeEach(async () => {
    const mockApi = new MockAdapter(axios);
    mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(200, testRecipes);
    mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Category`).reply(200, testCategory);
    // const Form = () => (
    //   <form />
    // );
    // await act(async () => render(<Form />));
    await act(async () => render(
    // render(
      <AddForm />,
    ));
  });

  test('input fields to add a new recipe are displayed', async () => {
    expect(await screen.findByText(/add a new recipe/i)).toBeInTheDocument();
    // expect(await screen.findByRole('textbox', {
    //   name: /recipe name/i,
    // }).toBeInTheDocument();
    expect(await screen.findByTestId('Recipe name')).toBeInTheDocument();
    // expect(await screen.findByLabelText('Employee ID')).toBeInTheDocument();
    // expect(await screen.findByLabelText('Role')).toBeInTheDocument();
    // expect(await screen.findByLabelText('Office')).toBeInTheDocument();
    // expect(await screen.findByLabelText('Manager Name')).toBeInTheDocument();
  });
});
