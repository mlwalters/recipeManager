import React from 'react';
import Typography from '@mui/material/Typography';
import rotatingLogo from '../../assets/shared-images/loadingLogo.jpg';
import './LoadingDisplay.css';

const LoadingDisplay = () => (
  <>
    <Typography component="span" variant="h6">Loading...</Typography>
    <img className="rotate" src={rotatingLogo} alt="loading display" height="120px" m="10" />
  </>
);
export default LoadingDisplay;
