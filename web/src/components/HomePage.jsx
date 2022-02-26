import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import RecipeCardList from './RecipeCardList';
import RecipeListView from './RecipeListView';

const HomePage = () => (
  <>
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'grid',
          border: 'none',
          p: 3,
        }}
      >
        <Link to="/recipe/add">
          <Fab color="secondary" variant="extended" p={2}>
            <Typography variant="body1" component="span" color="white">Add recipe</Typography>
          </Fab>
        </Link>
      </Box>
      <Grid container>
        <RecipeCardList />
      </Grid>
      <RecipeListView />
    </Container>
  </>
);
export default HomePage;
