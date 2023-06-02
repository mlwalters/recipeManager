import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BackToHomeBtn from '../sharedComponents/BackToHomeBtn';
import SwitchImageCard from '../sharedComponents/SwitchImageCard';
import './RecipeDetails.css';
import NotFoundErrorMsg from '../sharedComponents/error/NotFound';
import Toast, { variants } from '../sharedComponents/toast/Toast';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState({
    id: 0, name: '', userEmail: '', category: '', imageUrl: '', description: '', notes: '', servingSize: 0, instructions: [], ingredients: [],
  });
  const [fetchRecipeError, setFetchRecipeError] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState(variants.info);
  const navigate = useNavigate();
  const { id } = useParams();
  const print = () => window.print();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Recipe/${id}`);
        setRecipe(data);
      } catch (err) {
        setFetchRecipeError(err);
      }
    };
    fetchRecipe();
  }, []);

  if (fetchRecipeError) {
    return (
      <Container maxWidth="xl">
        <BackToHomeBtn />
        <NotFoundErrorMsg />
      </Container>
    );
  }

  const addToGroceryList = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_API}/api/GroceryItems/Add/${id}`);
      navigate('/grocerylist');
    } catch (err) {
      setToastMessage('Oops! Could not add ingredients to grocery list, try again');
      setToastVariant(variants.error);
    }
  };

  return (
    <Container maxWidth="lg">
      <BackToHomeBtn />
      <Box sx={{ flexGrow: 1, p: 2, mb: 5 }}>
        <Grid container spacing={3} className="section-to-print">
          <Grid item xs={10}>
            <Item id="hide-print">
              {recipe.imageUrl === '' ? <img src={SwitchImageCard(recipe.category)} alt={recipe.name} height="250" id="details-image" />
                : <img src={recipe.imageUrl} alt={recipe.name} height="250" id="details-image" />}
            </Item>
            <Item>
              <Typography variant="h5" color="#263238" mt={1}>{recipe.name}</Typography>
              <br />
              <Typography variant="body1" color="text.secondary">
                <RestaurantIcon sx={{ width: 20 }} />
                {' '}
                {recipe.category}
              </Typography>
              <br />
              <Typography variant="body2" color="text.secondary" fontStyle="italic">{recipe.description}</Typography>
              <br />
              <Typography variant="body2" color="text.secondary">
                Serving size:
                {' '}
                {recipe.servingSize}
              </Typography>
            </Item>
            <Item>
              <Typography variant="body1" color="#263238">Ingredients</Typography>
              {recipe.ingredients.map((ingredient) => (
                <div key={ingredient.id}>
                  <p variant="body2" color="text.secondary">
                    <span>{ingredient.amount}</span>
                    {' '}
                    <span>{ingredient.name}</span>
                  </p>
                </div>
              ))}
            </Item>
            <Item>
              <Typography variant="body1" color="#263238">Instructions</Typography>
              {recipe.instructions.map((instruction) => (
                <div key={instruction.id}>
                  <p variant="body2" color="text.secondary">
                    <span>
                      {instruction.step}
                    </span>
                  </p>
                  <br />
                </div>
              ))}

            </Item>
            <Item>
              <Typography variant="body1" color="#263238">Notes</Typography>
              <Typography variant="body2" color="text.secondary">{recipe.notes}</Typography>
            </Item>

            <Item>
              <Fab color="secondary" variant="extended" onClick={print} sx={{ displayPrint: 'none' }}>
                Print Recipe
                {' '}
              </Fab>
              <Fab color="primary" variant="extended" onClick={() => addToGroceryList(recipe.id)}>
                Add to Grocery List
                {' '}
              </Fab>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Toast
        onClose={() => setToastMessage('')}
        message={toastMessage}
        variant={toastVariant}
      />
    </Container>
  );
};

export default RecipeDetails;
