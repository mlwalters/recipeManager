import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import ToggleButtonView from './ToggleButtonView';

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
      <ToggleButtonView />
    </Container>
  </>
);
export default HomePage;
