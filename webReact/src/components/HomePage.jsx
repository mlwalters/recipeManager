import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RecipeCardList from './RecipeCardList';
import NavBar from './sharedComponents/NavBar';

const Dashboard = () => (
  <Grid container>
    <NavBar />
    <Grid item xs={2}>
      <Typography variant="h6" color="primary">
        <Link to="/recipe/add">
          <AddCircleIcon />
          Add Recipe
        </Link>
      </Typography>
    </Grid>
    <Grid item>
      <Grid item>
        <RecipeCardList />
      </Grid>
    </Grid>
  </Grid>
);

export default Dashboard;
