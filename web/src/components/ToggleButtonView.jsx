import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {
  Paper, Box, Typography, Container,
} from '@mui/material';
import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';
import Toast, { variants } from './toast/Toast';
import AddRecipeForm from './forms/AddRecipeForm';
import NotFound from './error-msgs/NotFound';
import ListView from './recipe-list/list-view/ListView';
import RecipeCard from './new-recipe-card/RecipeCard';

export default function ToggleButtonView() {
  const [view, setView] = React.useState('card');
  const [categories, setCategories] = useState([{}]);
  const [submitError, setSubmitError] = useState(null);
  const [fetchCategoryError, setFetchCategoryError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState(variants.info);

  const { user } = useAuth0();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Category`);
        setCategories(data);
      } catch (err) {
        setFetchCategoryError(err);
        setToastMessage('Oops! There was an error, try again');
        setToastVariant(variants.error);
      }
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
      // const { data } =
      await axios.post(`${process.env.REACT_APP_BASE_API}/api/Recipe`, request);
      // setRecipes(data);
      setSubmitError(null);
      handleCloseModal();
      setToastMessage('New recipe added');
      setToastVariant(variants.success);
    } catch (err) {
      setSubmitError(err);
      // setToastMessage('Oops! Recipe submission failed, try again');
      // setToastVariant(variants.error);
    }
  };

  if (submitError) {
    return (
      <Container maxWidth="lg">
        <NotFound />
      </Container>
    );
  }

  if (fetchCategoryError) {
    return (
      <Container maxWidth="lg">
        <NotFound />
      </Container>
    );
  }

  return (
    <Paper sx={{ padding: 2 }} elevation={0}>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(event, newView) => {
          setView(newView);
        }}
        sx={{ padding: 1.5 }}
      >
        <ToggleButton aria-label="module" value="card">
          <ViewModuleIcon />
        </ToggleButton>
        <ToggleButton aria-label="list" value="list">
          <ViewListIcon />
        </ToggleButton>
        <Box sx={{ paddingTop: 1, paddingLeft: 1.5 }}>
          <Typography variant="h5">View All</Typography>
          <Box sx={{
            padding: 2, margin: 1,
          }}
          >
            <Button variant="contained" onClick={() => setIsModalOpen(true)}>Add Recipe</Button>
          </Box>
        </Box>
      </ToggleButtonGroup>
      {isModalOpen && (
        <AddRecipeForm
          categories={categories}
          saveError={submitError}
          onFormSubmit={handleSubmitModal}
          handleClose={handleCloseModal}
        />
      )}
      <Toast
        onClose={() => setToastMessage('')}
        message={toastMessage}
        variant={toastVariant}
      />
      {view === 'list' ? (
        <Box>
          <ListView />
        </Box>
      ) : (
        <Box>
          <RecipeCard />
        </Box>
      )}
    </Paper>
  );
}
