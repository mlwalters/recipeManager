import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import RecipeCardList from './RecipeCardList';

const Dashboard = () => (
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
        <RecipeCardList />
      </Grid>
    </Grid>
  </Grid>
);

export default Dashboard;
