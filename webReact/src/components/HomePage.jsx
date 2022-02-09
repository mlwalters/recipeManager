import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import { useAuth0 } from '@auth0/auth0-react';
import RecipeCardList from './RecipeCardList';
import NavBar from './sharedComponents/NavBar';

const HomePage = () => (
  <>
    <NavBar />
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'grid',
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
          border: 'none',
          p: 1,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
        }}
      >
        <Typography variant="h6" color="primary">
          <Link to="/recipe/add">
            <Fab color="secondary" variant="extended">
              Add recipe
              {' '}
              <AddCircleIcon sx={{ mr: 1 }} />
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
