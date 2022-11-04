import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import {
  render, screen,
} from '@testing-library/react';
import AddForm from './OldAddForm';

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

const onSubmitFn = jest.fn();

describe('AddForm: When add recipe form is rendered', () => {
  beforeEach(async () => {
    const mockApi = new MockAdapter(axios);
    mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Category`).reply(200, testCategory);
    mockApi.onPost(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(201, addedRecipe);

    render(
      <BrowserRouter>
        <AddForm onSubmit={onSubmitFn} />
      </BrowserRouter>,
    );
    expect(await screen.findByText('Add a new recipe')).toBeInTheDocument();
  });

  test('input fields to add a new recipe are displayed', async () => {
    expect(await screen.findByText(/add a new recipe/i)).toBeInTheDocument();
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
    expect(await screen.findByRole('button', { name: /add recipe/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  test('if a required field is missing, the add recipe button stays disabled', async () => {
    expect(await screen.findByRole('button', { name: /add recipe/i })).toBeDisabled();
    userEvent.type(await screen.findByRole('textbox', { name: /recipe name/i }), 'Sample Recipe');
    // const selectElement = screen.getByTestId('category-dropdown').parentElement;
    // userEvent.click(selectElement);
    // userEvent.click(screen.getByText('Beef'));
    // const saveButton = await screen.findByRole('button', { name: /add recipe/i });
    expect(await screen.findByRole('button', { name: /add recipe/i })).toBeDisabled();
    // await waitFor(() => expect(saveButton).toBeEnabled());
    // expect(onSubmitFn).toHaveBeenCalled();
  });
});
