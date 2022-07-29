import React from 'react';
import Container from '@mui/material/Container';
import GroceryList from './GroceryList';

const GroceryListPage = () => (
  <>
    <Container maxWidth="lg">
      <h1>Grocery List</h1>
      <GroceryList />
    </Container>
  </>
);
export default GroceryListPage;
