import React from 'react';
import Fab from '@mui/material/Fab';

const CTAButton = (color, variant, action, txt) => {
  <Fab color={color} variant={variant} onClick={action}>
    {txt}
  </Fab>;
};

export default CTAButton;
