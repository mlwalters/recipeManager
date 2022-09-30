import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import GroceryList from '../../components/GroceryList';

const GroceryListPage = () => (
  <>
    <Container maxWidth="lg">
      <Typography component="h1" variant="text.primary">Grocery List</Typography>
      <GroceryList />
    </Container>
  </>
);
export default GroceryListPage;
