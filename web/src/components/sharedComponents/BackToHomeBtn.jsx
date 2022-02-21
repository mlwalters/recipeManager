import { Box, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackToHomeBtn = () => (
  <Box mt={2} p={1}>
    <Link to="/home">
      <ArrowBackIcon />
      <Typography component="span" variant="h6">  Back to home</Typography>
    </Link>
  </Box>

);

export default BackToHomeBtn;
