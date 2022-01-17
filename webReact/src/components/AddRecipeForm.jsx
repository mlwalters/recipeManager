// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
import React from 'react';

import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

const ariaLabel = { 'aria-label': 'description' };

const AddRecipeForm = () => (
  <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <Input placeholder="Recipe name" inputProps={ariaLabel} />
    <Input placeholder="Serving size" inputProps={ariaLabel} type="number" />
    <Input placeholder="Description" inputProps={ariaLabel} />
    <Input placeholder="Notes" inputProps={ariaLabel} multiline="true" />
  </Box>
);

export default AddRecipeForm;
