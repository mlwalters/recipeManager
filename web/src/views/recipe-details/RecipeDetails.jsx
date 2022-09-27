import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BackToHomeBtn from '../../components/navigation/back-to-home/BackToHomeBtn';
import SwitchImageCard from '../../components/SwitchImageCard';
import './RecipeDetails.css';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

const RecipeDetails = () => {
  const [details, setDetails] = useState({
    id: 0, name: '', userEmail: '', category: '', imageUrl: '', description: '', notes: '', servingSize: 0, instructions: [], ingredients: [],
  });
  const [fetchError, setFetchError] = useState(null);
  const [addError, setAddError] = useState(null);
  const { user } = useAuth0();
  const navigate = useNavigate();
  const { id } = useParams();
  const print = () => window.print();

  const addToGroceryList = async (ingredients) => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_API}/api/GroceryList/${user.email}`, ingredients);
      navigate('/grocerylist');
    } catch (err) {
      setAddError(err);
    }
  };
  if (addError) {
    return (
      <Typography>Oops! Could not add ingredients to grocery list.</Typography>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Recipe/${id}`);
        setDetails(data);
      } catch (err) {
        setFetchError(err);
      }
    };

    fetchData();
  }, []);

  if (fetchError) {
    return (
      <Typography>Oops! Could not fetch recipe details.</Typography>
    );
  }

  return (
    <Container maxWidth="lg">
      <BackToHomeBtn />
      <Box sx={{ flexGrow: 1, p: 2, mb: 5 }}>
        <Grid container spacing={3} className="section-to-print">
          <Grid item xs={10}>
            <Item id="hide-print">
              {details.imageUrl === '' ? <img src={SwitchImageCard(details.category)} alt={details.name} height="250" id="details-image" />
                : <img src={details.imageUrl} alt={details.name} height="250" id="details-image" />}
            </Item>
            <Item>
              <Typography variant="h5" color="#263238" mt={1}>{details.name}</Typography>
              <br />
              <Typography variant="body1" color="text.secondary">
                <RestaurantIcon sx={{ width: 20 }} />
                {' '}
                {details.category}
              </Typography>
              <br />
              <Typography variant="body2" color="text.secondary" fontStyle="italic">{details.description}</Typography>
              <br />
              <Typography variant="body2" color="text.secondary">
                Serving size:
                {' '}
                {details.servingSize}
              </Typography>
            </Item>
            <Item>
              <Typography variant="body1" color="#263238">Ingredients</Typography>
              {details.ingredients.map(({ ingredientId, amount, name }) => (
                <div key={ingredientId}>
                  <p variant="body2" color="text.secondary">
                    <span>{amount}</span>
                    {' '}
                    <span>{name}</span>
                  </p>
                </div>
              ))}
            </Item>
            <Item>
              <Typography variant="body1" color="#263238">Instructions</Typography>
              {details.instructions.map(({ step, index }) => (
                <div key={index}>
                  <p variant="body2" color="text.secondary">
                    <span>{index}</span>
                    {' '}
                    <span>
                      {step}
                    </span>
                  </p>
                  <br />
                </div>
              ))}

            </Item>
            <Item>
              <Typography variant="body1" color="#263238">Notes</Typography>
              <Typography variant="body2" color="text.secondary">{details.notes}</Typography>
            </Item>

            <Item>
              <Fab color="secondary" variant="extended" onClick={print} sx={{ displayPrint: 'none' }}>
                Print Recipe
                {' '}
              </Fab>
              <Fab color="primary" variant="extended" onClick={addToGroceryList(details.ingredients)}>
                Add to Grocery List
                {' '}
              </Fab>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default RecipeDetails;
