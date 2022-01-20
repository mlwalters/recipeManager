import axios from 'axios';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';

const AddRecipeForm = () => {
  const [recipeFormValues, setRecipeFormValues] = useState([]);
  const [error, setError] = useState(null);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setRecipeFormValues({
      ...recipeFormValues,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setRecipeFormValues(recipeFormValues); // or e.target.value?
    try {
      axios.post(`${process.env.REACT_APP_BASE_API}/api/Recipe`, recipeFormValues);
    } catch (err) {
      setError(err);
    }
  };

  if (error) {
    return (
      <div>Oops! Could not fetch recipe card.</div>
    );
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, p: 1, width: '60ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        label="Recipe name"
        variant="outlined"
        required
        name="name"
        value={recipeFormValues.name}
        onChange={handleOnChange}
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
};

export default AddRecipeForm;
