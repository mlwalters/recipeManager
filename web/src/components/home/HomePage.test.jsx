import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import HomePage from './HomePage';
import ToggleButtonView from '../sharedComponents/ToggleButtonView';

const userEmail = 'google@yahoo.com';
const recipeCards = [{
  id: 1,
  name: 'Strawberry Cheesecake',
  userEmail: 'google@yahoo.com',
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

describe('Home Page: When the page is rendered', () => {
  beforeEach(async () => {
    const mockApi = new MockAdapter(axios);
    mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe/All/${userEmail}`).reply(200, recipeCards);
    mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Category`).reply(200, categories);
    render(
      <BrowserRouter>
        <HomePage>
          <ToggleButtonView />
        </HomePage>
      </BrowserRouter>,
    );
    expect(await screen.findByText('View All')).toBeInTheDocument();
  });

  test('it should display add recipe button', async () => {
    expect(await screen.findByRole('button', { name: /add recipe/i })).toBeInTheDocument();
  });
});
