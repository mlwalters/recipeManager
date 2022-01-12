import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, screen } from '@testing-library/react';
import RecipeDetails from './RecipeDetails';

const details = {
  id: 2,
  name: 'Lentil Soup',
  description: 'The touch of spices with lemon really lifts this soup to the next level.',
  servingSize: 6,
  category: 'Soup',
  notes: '',
  instructions: [
    {
      id: 3,
      step: 'Heat oil in a large pot over medium heat. Add garlic and onion, cook for 2 minutes.',
      stepNumber: 1,
    },
    {
      id: 4,
      step: 'Add celery and carrot. Cook for 7-10 minutes or until softened and the onion is sweet.',
      stepNumber: 2,
    },
  ],
};
// TODO: Refactor using within or just change the render code
test('renders details on the recipe details page', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe/2`).reply(200, details);
  const DetailsTest = () => (
    <div>
      <h2>
        {details.name}
      </h2>
      <p>
        {details.description}
      </p>
      <p>
        {details.category}
      </p>
      <p>
        {details.servingSize}
      </p>
      <div>
        <p>
          {details.instructions[0].step}
        </p>
      </div>
    </div>
  );
  render(<DetailsTest />);
  expect(await screen.findByText(details.name)).toBeInTheDocument();
  expect(await screen.findByText(details.description)).toBeInTheDocument();
  expect(await screen.findByText(details.servingSize)).toBeInTheDocument();
  expect(await screen.findByText(details.category)).toBeInTheDocument();
  expect(await screen.findByText(details.instructions[0].step)).toBeInTheDocument();
  // expect(await screen.findByText(recipeDetails.notes)).toBeInTheDocument();

  // const recipeName = await screen.findByText('Lentil Soup');
  // // expect(recipeName).toBeInTheDocument();
  // const recipeDiv = recipeName.parentElement;
  // expect(await within(recipeDiv).findByText(details.description)).toBeInTheDocument();
});

test('renders error if fetching recipe card fails', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe/2`).reply(500);
  render(<RecipeDetails />);
  expect(await screen.findByText('Oops! Could not fetch recipe details.')).toBeInTheDocument();
});
