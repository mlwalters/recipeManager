import React from 'react';
import Container from '@mui/material/Container';
import { Box, Typography } from '@mui/material';
import notfound from '../../../assets/shared-images/notfound.jpg';

const NotFoundErrorMsg = () => (
  <Container maxWidth="md">
    <Box sx={{
      display: 'flex', alignItems: 'center', width: '100%', marginTop: 5, marginBottom: 5,
    }}
    >
      <img src={notfound} alt="Error message: Oops, there was an error." width="500" />
      <Typography variant="h5">Oops, there was an error.</Typography>
    </Box>
  </Container>
);

export default NotFoundErrorMsg;
