import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
// import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ToggleButtonView from '../../components/ToggleButtonView';
import Toast, { variants } from '../../components/toast/Toast';
import AddRecipeForm from '../../components/forms/AddRecipeForm';

const HomePage = () => {
  const [categories, setCategories] = useState([{}]);
  const [submitError, setSubmitError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState(variants.info);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Category`);
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubmitError(null);
  };

  const handleSubmitModal = async (values) => {
    const request = values;
    request.userEmail = user.email;
    try {
      await axios.post(`${process.env.REACT_APP_BASE_API}/api/Recipe`, request);
      setSubmitError(null);
      handleCloseModal();
      setToastMessage('New recipe added');
      setToastVariant(variants.success);
    } catch (err) {
      setSubmitError(err);
    }
  };

  if (submitError) {
    return (
      <Typography component="p" variant="h6">Oops! Recipe submission failed.</Typography>
    );
  }
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'grid',
          border: 'none',
          pt: 3,
          pl: 3,
        }}
      >
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>Add Recipe</Button>
      </Box>
      <ToggleButtonView />
      {isModalOpen && (
        <AddRecipeForm
          categories={categories}
          saveError={submitError}
          onSubmit={handleSubmitModal}
          handleClose={handleCloseModal}
        />
      )}
      <Toast
        onClose={() => setToastMessage('')}
        message={toastMessage}
        variant={toastVariant}
      />
    </Container>
  );
};
export default HomePage;
