import React from 'react';
import Container from '@mui/material/Container';
import AddForm from './AddForm';
import BackToHomeBtn from './sharedComponents/BackToHomeBtn';

const AddRecipePage = () => (
  <Container maxWidth="lg">
    <BackToHomeBtn />
    <AddForm />
  </Container>
);

export default AddRecipePage;
