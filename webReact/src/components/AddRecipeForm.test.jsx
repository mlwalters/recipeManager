import React from 'react';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router';
import {
  render, screen,
} from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import AddRecipeForm from './AddRecipeForm';

// const testRecipes = [
//   {
//     id: 123,
//     name: '',
//   },
//   {
//     id: 456,
//     name: '',
//   },
//   {
//     id: 789,
//     name: '',
//   },
// ];

// const addedRecipe = {
//   id: 213, name: 'Mushroom Risotto', description: '',
// notes: 'Use dried mushrooms for extra flavor',
// };

// const clickToAddRecipe = async () => {
//   const addButton = await screen.findByRole('button', { name: 'Add Recipe' });
//   userEvent.click(addButton);
// };

test('renders the form to add recipe when the page loads', async () => {
  render(
    <BrowserRouter>
      <AddRecipeForm />
    </BrowserRouter>,
  );
  expect(screen.getByLabelText('Recipe name')).toBeInTheDocument();
});
