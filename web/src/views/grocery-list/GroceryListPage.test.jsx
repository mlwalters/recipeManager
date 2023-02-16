import React from 'react';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GroceryListPage from './GroceryListPage';
import AddGroceryItemForm from '../../components/forms/AddGroceryItemForm';

const userEmail = 'google@yahoo.com';

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    user: {
      email: userEmail,
    },
  }),
}));

const groceryItems = [
  {
    id: 1,
    name: 'honey',
    checked: false,
    userEmail,
  },
  {
    id: 2,
    name: 'milk',
    checked: false,
    userEmail,
  },
];

const noOfItems = groceryItems.length;
const onSubmitFn = jest.fn();
const handleCloseFn = jest.fn();

describe('Grocery List Page: When the page is rendered', () => {
  beforeEach(async () => {
    const mockApi = new MockAdapter(axios);
    mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/GroceryItems/All/${userEmail}`).reply(200, groceryItems);
    render(
      <BrowserRouter>
        <GroceryListPage />
      </BrowserRouter>,
    );
    expect(await screen.findByText(`Grocery List (${noOfItems})`)).toBeInTheDocument();
  });

  test('it should display the back to home button', async () => {
    expect(screen.getByText(/back to home/i)).toBeInTheDocument();
  });

  test('it should display the add an item button', async () => {
    expect(screen.getByText(/add an item/i)).toBeInTheDocument();
  });

  test('it should display the grocery items in the list', async () => {
    expect(screen.getByText(/milk/i)).toBeInTheDocument();
    expect(screen.getByText(/honey/i)).toBeInTheDocument();
  });
});

describe('Grocery List Page: When the add an item form is rendered', () => {
  beforeEach(async () => {
    const mockApi = new MockAdapter(axios);
    mockApi.onPost(`${process.env.REACT_APP_BASE_API}/api/GroceryItems/Add`).reply(200, groceryItems);
    mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/GroceryItems/All/${userEmail}`).reply(200, groceryItems);
    render(
      <AddGroceryItemForm onSubmit={onSubmitFn} handleClose={handleCloseFn} />,
    );
    expect(await screen.findByText('Add an item')).toBeInTheDocument();
  });

  test('it should display the form details and buttons', async () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/eggs/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  test('it should close the modal when I click on cancel', async () => {
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    userEvent.click(cancelBtn);
    expect(handleCloseFn).toHaveBeenCalled();
  });

  test('and when I add an item', async () => {
    userEvent.type(screen.getByLabelText(/name/i, 'flour'));
    const saveBtn = screen.getByRole('button', { name: /save/i });
    userEvent.click(saveBtn);
    expect(onSubmitFn).toHaveBeenCalled();
  });
});
