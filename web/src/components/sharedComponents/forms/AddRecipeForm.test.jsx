import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  render, screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddRecipeForm from './AddRecipeForm';

const testCategories = [
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

const testRecipe = {
  name: 'Amatriciana',
  description: 'Roman traditional food',
  category: 2,
};

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

const onSubmitFn = jest.fn();
const handleCloseFn = jest.fn();

describe('AddRecipeForm: When add recipe form is rendered and used', () => {
  beforeEach(async () => {
    const mockApi = new MockAdapter(axios);
    mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Category`).reply(200, testCategories);
    mockApi.onPost(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(201, addedRecipe);

    render(
      <AddRecipeForm onAddRecipeFormSubmit={onSubmitFn} handleClose={handleCloseFn} />,
    );
    expect(await screen.findByText('Add Recipe')).toBeInTheDocument();
  });

  test('input fields to add a new recipe are displayed', async () => {
    expect(await screen.findByRole('textbox', { name: /recipe name/i })).toBeInTheDocument();
    expect(await screen.findByRole('textbox', { name: /description/i })).toBeInTheDocument();
    expect(await screen.findByRole('textbox', { name: /image url/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /category/i })).toBeInTheDocument();
    expect(await screen.findByText(/ingredients/i)).toBeInTheDocument();
    expect(await screen.findByRole('textbox', { name: /amount/i })).toBeInTheDocument();
    expect(await screen.findByRole('textbox', { name: /ingredient/i })).toBeInTheDocument();
    expect(await screen.findByTestId('add-icon-ingredient')).toBeInTheDocument();
    expect(await screen.findByText(/instructions/i)).toBeInTheDocument();
    expect(await screen.findByText(/# 1/i)).toBeInTheDocument();
    expect(await screen.findByRole('textbox', { name: /step/i })).toBeInTheDocument();
    expect(await screen.findByTestId('add-icon-ingredient')).toBeInTheDocument();
    expect(await screen.findByRole('textbox', { name: /notes/i })).toBeInTheDocument();
  });

  test('buttons to add a new recipe and reset form are displayed', async () => {
    expect(await screen.findByRole('button', { name: /save recipe/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  test('if a required field is missing, the add recipe button stays disabled', async () => {
    userEvent.type(await screen.findByRole('textbox', { name: /recipe name/i }), testRecipe.name);
    expect(await screen.findByRole('button', { name: /save recipe/i })).toBeDisabled();
  });

  // test('if all required fields are filled out, the add recipe button should be enabled',
  // async () => {
  //   const recipeNameField = await screen.findByRole('textbox', { name: /recipe name/i });
  //   const categoryDropdown = await screen.findByRole('button', { name: /category */i });
  //   userEvent.type(recipeNameField, testRecipe.name);
  //   userEvent.click(categoryDropdown);
  //   console.log(categoryDropdown);
  //   userEvent.click(await screen.findByRole('option', { name: /seafood/i }));
  //   const category = await screen.findByText(/seafood/i);
  //   expect(category).toBeInTheDocument();
  //   expect(await screen.findByRole('button', { name: /save recipe/i })).toBeEnabled();
  // });

  test('if the form fields are not empty, the reset button should be enabled', async () => {
    userEvent.type(await screen.findByRole('textbox', { name: /recipe name/i }), testRecipe.name);
    expect(await screen.findByRole('button', { name: /reset/i })).toBeEnabled();
  });

  test('if the reset button is clicked, the form fields should be empty', async () => {
    const descriptionField = await screen.findByRole('textbox', { name: /description/i });
    userEvent.type(descriptionField, testRecipe.description);
    const resetBtn = await screen.findByRole('button', { name: /reset/i });
    userEvent.click(resetBtn);
    expect(descriptionField).toHaveValue('');
    expect(await screen.findByRole('button', { name: /reset/i })).toBeDisabled();
  });

  test('add recipe form closes when the close button is clicked', async () => {
    const closeBtn = screen.getAllByRole('button', { name: /close/i });
    userEvent.click(closeBtn[0]);
    expect(handleCloseFn).toHaveBeenCalledTimes(1);
  });
});
