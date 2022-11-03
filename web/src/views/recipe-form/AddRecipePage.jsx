import React from 'react';
import Container from '@mui/material/Container';
import AddForm from '../../components/add-recipe-form/AddForm';
import BackToHomeBtn from '../../components/navigation/back-to-home/BackToHomeBtn';
import Toast, { variants } from '../../components/toast/Toast';

const AddRecipePage = () => (
  <Container maxWidth="lg">
    <BackToHomeBtn />
    <AddForm />
    <Toast
      onClose={() => setToastMessage('')}
      message={toastMessage}
      variant={toastVariant}
    />
  </Container>
);

export default AddRecipePage;
