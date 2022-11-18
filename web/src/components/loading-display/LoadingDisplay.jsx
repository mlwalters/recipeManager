import React from 'react';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

const LoadingDisplay = () => (
  <Container maxWidth="xl">
    <Box sx={{
      width: '100%', marginTop: 5, marginBottom: 5,
    }}
    >
      <LinearProgress />
    </Box>
  </Container>

);
export default LoadingDisplay;
