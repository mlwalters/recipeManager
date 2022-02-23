import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom'; //  Route, Routes
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import RecipeCardList from './RecipeCardList';

const userEmail = 'google@yahoo.com';
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    user: {
      email: userEmail,
    },
  }),
}));

const sampleId = 9;

const recipeCards = [{
  id: 1,
  email: 'google@yahoo.com',
  name: 'Strawberry Cheesecake',
  description: 'A light-yet-rich cheesecake, creamynot dense-creamy like New York cheesecake.',
  servingSize: 12,
  imageUrl: 'dessert.jpg',
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
  email: 'google@yahoo.com',
  name: 'Lentil Soup',
  description: 'The touch of spices with lemon really lifts this soup to the next level.',
  servingSize: 6,
  category: 'Soup',
  imageUrl: 'soup.jpg',
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

// const onCancelFn = jest.fn();
// const onDeleteFn = jest.fn();

const renderWithMocks = (fetchError, fetchErrorCode, deleteError, deleteErrorCode) => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe/All/${userEmail}`).reply(200, recipeCards);
  if (deleteError) {
    mockApi.onDelete(`${process.env.REACT_APP_BASE_API}/api/Recipe/${sampleId}`).reply(deleteErrorCode);
  } else {
    mockApi.onDelete(`${process.env.REACT_APP_BASE_API}/api/Recipe/${sampleId}`).reply(200, recipeCards);
  }
  if (fetchError) {
    mockApi.onPut(`${process.env.REACT_APP_BASE_API}/api/Recipe/${sampleId}`).reply(fetchErrorCode);
  } else {
    mockApi.onPut(`${process.env.REACT_APP_BASE_API}/api/Recipe/${sampleId}`).reply(200, recipeCards);
  }
  render(
    <BrowserRouter>
      <RecipeCardList />
    </BrowserRouter>,
  );
};

// const renderWithMockFavoriteError = (fetchErrorCode) => {
//   renderWithMocks(true, fetchErrorCode);
// };

// const renderWithMockDeleteError = (deleteErrorCode) => {
//   renderWithMocks(true, deleteErrorCode);
// };

test('renders loading before getting recipe cards list', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi
    .onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe/All/${userEmail}`)
    .reply(() => new Promise((resolve) => setTimeout(() => resolve([200, []]), 500)));
  render(
    <BrowserRouter>
      <RecipeCardList />
    </BrowserRouter>,
  );
  const loadingText = await screen.findByText('Loading...');
  expect(loadingText).toBeInTheDocument();
  await waitForElementToBeRemoved(loadingText);
});

test('renders error if fetching recipe cards list fails', async () => {
  const mockApi = new MockAdapter(axios);
  mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Projects`).reply(500);
  render(<RecipeCardList />);
  expect(await screen.findByText('Oops! Could not fetch recipe cards.')).toBeInTheDocument();
});

describe('RecipeCardList: When recipe card list is rendered', () => {
  beforeEach(async () => {
    renderWithMocks();
  });

  test('renders recipe cards list on the home page', async () => {
    renderWithMocks();
    expect(await screen.findByText(/strawberry cheesecake/i)).toBeInTheDocument();
    // expect(await screen.findByAltText(`Picture of ${sampleRecipe.category}`)).toBeInTheDocument()
    // expect(await screen.findByText(recipeCards[0].description)).toBeInTheDocument();
    // expect(await screen.findByTestId('favorite icon')); // .toBeDefined();
  });

  // test('renders recipe card image', async () => {
  //   renderWithMocks();
  //   expect(await screen.findByText(/picture of dessert/i)).toBeInTheDocument();
  //   // const image = await screen.findByAltText(`Picture of ${recipeCards[0].category}`);
  //   // expect(image).toHaveAttribute('src', recipeCards[0].imageUrl);
  // });
});
