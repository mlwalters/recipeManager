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
import NotFound from './error/NotFound';
import ListView from '../recipe-list/list-view/ListView';
import RecipeCard from '../recipe-list/new-recipe-card/RecipeCard';
import LoadingDisplay from './LoadingDisplay';

export default function ToggleButtonView() {
  const [view, setView] = useState('card');
  const [loadingState, setLoadingState] = useState(true);
  const [categories, setCategories] = useState([{}]);
  const [fetchCategoryError, setFetchCategoryError] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [fetchRecipesError, setFetchRecipesError] = useState(null);
  const [saveRecipeError, setSaveRecipeError] = useState(null);
  const [favoriteToggle, setFavoriteToggle] = useState(false);
  const [idToRemove, setIdToRemove] = useState(null);
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
      const newRecipe = await axios.post(`${process.env.REACT_APP_BASE_API}/api/Recipe`, request);
      setRecipes([...recipes, newRecipe.data]);
      setSaveRecipeError(null);
      handleCloseAddRecipeModal();
      setToastMessage('New recipe added');
      setToastVariant(variants.success);
    } catch (err) {
      setSaveRecipeError('Oops, could not save the recipe');
      setToastMessage(saveRecipeError);
      setToastVariant(variants.error);
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

  const handleDeleteRecipe = async () => {
    const recipeToDelete = recipes.find((recipe) => recipe.id === idToRemove);
    setIsDeleteDialogOpen(false);
    try {
      const { data } = await axios.delete(`${process.env.REACT_APP_BASE_API}/api/Recipe/${recipeToDelete.id}`);
      setRecipes(data);
      setToastMessage('Recipe has been deleted');
      setToastVariant(variants.info);
    } catch (err) {
      setToastMessage('Oops! Could not delete recipe, try again');
      setToastVariant(variants.error);
    }
  };

  const handleCancelDeleteDialog = () => setIsDeleteDialogOpen(false);

  const handleClickDeleteDialog = (idToDelete) => {
    setIdToRemove(idToDelete);
    setIsDeleteDialogOpen(true);
  };

  if (loadingState) {
    return (
      <LoadingDisplay />
    );
  }

  if (fetchRecipesError || fetchCategoryError) {
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
      <Box sx={{
        marginBottom: 3, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center',
      }}
      >
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
        </ToggleButtonGroup>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" component="h5">All Recipes</Typography>
        </Box>
        <Box>
          <Button variant="contained" onClick={() => setIsAddRecipeModalOpen(true)}>Add Recipe</Button>
        </Box>
      </Box>

      {isAddRecipeModalOpen && (
        <AddRecipeForm
          categories={categories}
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
