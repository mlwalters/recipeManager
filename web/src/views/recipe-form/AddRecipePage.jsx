import React from 'react';
import Container from '@mui/material/Container';
import AddForm from '../../components/add-recipe-form/AddForm';
import BackToHomeBtn from '../../components/navigation/back-to-home/BackToHomeBtn';

const AddRecipePage = () => (
  <Container maxWidth="lg">
    <BackToHomeBtn />
    <AddForm />
  </Container>
);

export default AddRecipePage;
