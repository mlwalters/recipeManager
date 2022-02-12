import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
import NavBar from './NavBar';

test('renders navigation bar on the home page', async () => {
  // const mockApi = new MockAdapter(axios);
  // mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Recipe`).reply(200, testRecipes);
  // mockApi.onGet(`${process.env.REACT_APP_BASE_API}/api/Category`).reply(200, testCategory);
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>,
  );
  // expect(screen.getByTestId('LOGO')).toBeInTheDocument();
  expect(await screen.findByRole('LOGO').href).toBe('http://localhost:3000');

  expect(await screen.findByText('Add Recipe')).toBeInTheDocument();
  expect(await screen.findByText('Favorites')).toBeInTheDocument();
  expect(await screen.findByText('Meal Planner')).toBeInTheDocument();
});
