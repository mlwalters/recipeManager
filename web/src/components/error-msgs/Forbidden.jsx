import React from 'react';
import Container from '@mui/material/Container';
import { Box, Typography } from '@mui/material';
import forbidden from '../../assets/shared-images/403.jpg';

const Forbidden = () => (
  <Container maxWidth="md">
    <Box sx={{
      display: 'flex', alignItems: 'center', width: '100%', marginTop: 5, marginBottom: 5,
    }}
    >
      <img src={forbidden} alt="Error message: Access Denied" width="500" />
      <Typography variant="h5">We are sorry, but you do not have permission to access the requested page.</Typography>
    </Box>
  </Container>
);

export default Forbidden;
