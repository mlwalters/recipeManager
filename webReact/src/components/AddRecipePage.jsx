import React from 'react';
import Container from '@mui/material/Container';
import FormikForm2 from './Formik2';
import NavBar from './sharedComponents/NavBar';

const AddRecipePage = () => (
  <>
    <NavBar />
    <Container maxWidth="lg">
      <FormikForm2 />
    </Container>
  </>
);

export default AddRecipePage;
