// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
import React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';

// const ariaLabel = { 'aria-label': 'description' };

const AddRecipeForm = () => (
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //  setNewRecipe(e.target.value);
  // };
  <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 2, p: 1, width: '60ch' },
    }}
    noValidate
    autoComplete="off"
    // onSubmit={handleSubmit}
  >
    <TextField
      label="Recipe name"
      variant="outlined"
      required
    />
    <TextField
      label="Category"
      variant="outlined"
    />
    <TextField
      // id="outlined-select-category"
      select
      label="Category"
      // value={category}
      // onChange={handleChange}
      helperText="Please select the recipe type"
    />
    <TextField
      label="Serving Size"
      variant="outlined"
      type="number"
    />
    <TextField
      label="Description"
      variant="outlined"
      multiline
      rows={2}
    />
    {/* <FormControl>
      <TextField
        label="Step"
        variant="outlined"
      />
    </FormControl> */}
    <TextField
      label="Notes"
      variant="outlined"
      multiline
      rows={3}
    />
    <Button
      type="submit"
      color="secondary"
      variant="contained"
    >
      Add recipe
    </Button>
  </Box>
);

export default AddRecipeForm;
