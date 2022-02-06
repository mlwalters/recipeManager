import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const RecipeDetails = () => {
  const [details, setDetails] = useState({
    id: 0, name: '', category: '', description: '', notes: '', servingSize: 0, instructions: [], ingredients: [],
  });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const print = () => window.print();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Recipe/${id}`);
        setDetails(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div>Oops! Could not fetch recipe details.</div>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <Item>
            <Typography variant="h3" color="#263238">{details.name}</Typography>
            <Typography variant="body2" color="text.secondary">{details.description}</Typography>
            <Typography variant="body2" color="text.secondary">
              Serving size:
              {' '}
              {details.servingSize}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <RestaurantIcon />
              {' '}
              {details.category}
            </Typography>
            <Typography variant="body2" color="text.secondary">{details.notes}</Typography>
          </Item>
          <Item>
            <Typography variant="h6" color="#263238">Ingredients</Typography>
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
            <Typography variant="h6" color="#263238">Instructions:</Typography>
            {details.instructions.map(({ step, stepNumber }) => (
              <div key={stepNumber}>
                <p variant="body2" color="text.secondary">
                  <span>{stepNumber}</span>
                  {' '}
                  <span>{step}</span>
                </p>
              </div>
            ))}
          </Item>
          <Item>
            <Button onClick={print} sx={{ displayPrint: 'none' }}>
              <Fab color="secondary" variant="extended">
                Print Recipe
                {' '}
              </Fab>
            </Button>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RecipeDetails;
