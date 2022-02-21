import React from 'react';
import Typography from '@mui/material/Typography';
// import rotatingLogo from '../../assets/shared-images/loadingLogo.jpg';
import './LoadingDisplay.css';
import { Box } from '@mui/material';

const LoadingDisplay = () => (
  <Box m={2} p={2}>
    <Typography component="span" variant="h3">Loading...</Typography>
    {/* <img className="rotate" src={rotatingLogo}
    alt="loading display" height="120px" m="10" /> */}
  </Box>
);
export default LoadingDisplay;
