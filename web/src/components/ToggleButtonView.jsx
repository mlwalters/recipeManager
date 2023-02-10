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
import LoadingDisplay from './loading-display/LoadingDisplay';

export default function ToggleButtonView() {
  const [view, setView] = React.useState('card');
  const [loadingState, setLoadingState] = useState(true);
  const [categories, setCategories] = useState([{}]);
  const [fetchCategoryError, setFetchCategoryError] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [fetchRecipesError, setFetchRecipesError] = useState(null);
  const [saveRecipeError, setSaveRecipeError] = useState(null);
  const [favoriteToggle, setFavoriteToggle] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState(variants.info);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingState(true);
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Category`);
        setCategories(data);
        setLoadingState(false);
      } catch (err) {
        setFetchCategoryError(err);
        setToastMessage('Oops! There was an error, try again');
        setToastVariant(variants.error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Recipe/All/${user.email}`);
        setRecipes(data);
      } catch (err) {
        setFetchRecipesError(err);
      }
      setLoadingState(false);
    };
    fetchData();
  }, []);

  const handleCloseAddRecipeModal = () => {
    setIsAddRecipeModalOpen(false);
    setSaveRecipeError(null);
  };

  const handleSubmitAddRecipeModal = async (values) => {
    const request = values;
    request.userEmail = user.email;
    try {
      // const { data } = await axios.post(`${process.env.REACT_APP_BASE_API}/api/Recipe`, request);
      // setRecipes(data);
      const newRecipe = await axios.post(`${process.env.REACT_APP_BASE_API}/api/Recipe`, request);
      setRecipes([...recipes, newRecipe.data]);
      setSaveRecipeError(null);
      handleCloseAddRecipeModal();
      setToastMessage('New recipe added');
      setToastVariant(variants.success);
    } catch (err) {
      setSaveRecipeError(err);
      // setToastMessage('Oops! Recipe submission failed, try again');
      // setToastVariant(variants.error);
    }
  };

  const handleClickFavorite = async (id) => {
    const recipeToUpdate = recipes.find((recipe) => recipe.id === id);
    try {
      setFavoriteToggle((toggle) => !toggle);
      const request = { ...recipeToUpdate, favorite: favoriteToggle, userEmail: user.email };
      const { data } = await axios.put(`${process.env.REACT_APP_BASE_API}/api/Recipe/${id}`, request);
      setRecipes(data);
      if (!recipeToUpdate.favorite) {
        setToastMessage('Recipe saved in Favorites');
        setToastVariant(variants.success);
      } else {
        setToastMessage('Recipe removed from Favorites');
        setToastVariant(variants.info);
      }
    } catch (favoriteErr) {
      if (!recipeToUpdate.favorite) {
        setToastMessage('Oops! Could not save recipe in Favorites, try again');
      } else {
        setToastMessage('Oops! Could not delete recipe from Favorites, try again');
      }
      setToastVariant(variants.error);
    }
  };

  const handleDeleteRecipe = (id) => {
    // const recipeToDelete = recipes.find((recipe) => recipe.id === id);
    // console.log(recipeToDelete);
    setIsDeleteDialogOpen(false);
    const deleteData = async () => {
      try {
        const { data } = await axios.delete(`${process.env.REACT_APP_BASE_API}/api/Recipe/${id}`);
        setRecipes(data);
        setToastMessage('Recipe has been deleted');
        setToastVariant(variants.info);
      } catch (err) {
        setToastMessage('Oops! Could not delete recipe, try again');
        setToastVariant(variants.error);
      }
    };
    deleteData();
  };

  const handleCancelDeleteDialog = () => setIsDeleteDialogOpen(false);

  const handleClickDeleteDialog = () => setIsDeleteDialogOpen(true);

  if (loadingState) {
    return (
      <LoadingDisplay />
    );
  }

  if (fetchRecipesError || fetchCategoryError || saveRecipeError) {
    return (
      <Container maxWidth="lg">
        <NotFound />
      </Container>
    );
  }

  return (
    <Paper sx={{ padding: 2 }} elevation={0}>
      <div>
        Last rendered
        {' '}
        {new Date().toLocaleTimeString()}
      </div>
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
            <Button variant="contained" onClick={() => setIsAddRecipeModalOpen(true)}>Add Recipe</Button>
          </Box>
        </Box>
      </ToggleButtonGroup>
      {isAddRecipeModalOpen && (
        <AddRecipeForm
          categories={categories}
          saveError={saveRecipeError}
          onAddRecipeFormSubmit={handleSubmitAddRecipeModal}
          handleClose={handleCloseAddRecipeModal}
        />
      )}
      <Toast
        onClose={() => setToastMessage('')}
        message={toastMessage}
        variant={toastVariant}
      />
      {view === 'list' ? (
        <Box>
          <ListView
            allRecipes={recipes}
            handleFavoriteRecipe={handleClickFavorite}
            isDeleteOpen={isDeleteDialogOpen}
            handleCancelDeleteDialog={handleCancelDeleteDialog}
            handleClickDeleteDialog={handleClickDeleteDialog}
            handleDeleteRecipe={handleDeleteRecipe}
          />
        </Box>
      ) : (
        <Box>
          <RecipeCard
            allRecipes={recipes}
            handleFavoriteRecipe={handleClickFavorite}
            isDeleteOpen={isDeleteDialogOpen}
            handleCancelDeleteDialog={handleCancelDeleteDialog}
            handleClickDeleteDialog={handleClickDeleteDialog}
            handleDeleteRecipe={handleDeleteRecipe}
          />
        </Box>
      )}
    </Paper>
  );
}
