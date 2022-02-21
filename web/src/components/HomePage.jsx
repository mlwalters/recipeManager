import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
import RecipeCardList from './RecipeCardList';

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
        <Typography variant="h6" color="primary">
          <Link to="/recipe/add">
            <Fab color="secondary" variant="extended" p={2}>
              Add recipe
            </Fab>
          </Link>

        </Typography>
      </Box>
      <Grid container>
        <RecipeCardList />
      </Grid>
    </Container>
  </>
);
export default HomePage;
