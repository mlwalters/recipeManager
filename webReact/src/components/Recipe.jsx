import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RecipeCard from './RecipeCard';

const Recipe = () => (
  <Grid container>
    <Grid item xs={2}>
      <Typography variant="h6" color="primary">
        Favorites
      </Typography>
      <Typography variant="h6" color="primary">
        Meal Planner
      </Typography>
      <Typography variant="h6" color="primary">
        Shopping List
      </Typography>
    </Grid>
    <Grid item xs={10}>
      <Grid item>
        <RecipeCard />
      </Grid>
      <Grid item>
        <RecipeCard />
      </Grid>
    </Grid>
  </Grid>
);

export default Recipe;
