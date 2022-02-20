import React from 'react';
// import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import backgroundImage from '../assets/shared-images/landingpage-background.jpg';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const LandingPage = () => {
  const { isAuthenticated } = useAuth0();
  return (
    !isAuthenticated && (
      <>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={8} mt="9">
            <Item sx={{ border: 0, boxShadow: 0 }}><img src={backgroundImage} alt="background" width="800" /></Item>
            <Item sx={{ border: 0, boxShadow: 0 }}><Button variant="outlined"><LoginButton /></Button></Item>
            <Item sx={{ border: 0, boxShadow: 0 }}>
              Save your favorite recipes. Explore the foodie in you
            </Item>
            <Item sx={{ border: 0, boxShadow: 0 }}>Free for commercial or personal use.</Item>
            <Item sx={{ border: 0, boxShadow: 0 }}>
              Made by:
              {' '}
              <a href="https://github.com/mlwalters" target="_blank" rel="noreferrer">Maricar Lusuegro Walters</a>
            </Item>
          </Grid>
        </Grid>
        {/* <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              border: 'none',
              p: 3,
            }}
          >
            <div>
              Landing Page
              <LoginButton />
            </div>
            <img src={backgroundImage} alt="background" width="800" />
          </Box>
        </Container> */}
      </>

    )
  );
};

export default LandingPage;
