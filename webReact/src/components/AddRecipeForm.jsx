import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

const AddRecipeForm = () => {
  const [recipeFormValues, setRecipeFormValues] = useState([]);
  const [categories, setCategories] = useState([{}]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Category`);
      // console.log(data);
      setCategories(data);
    };

    fetchCategories();
  }, []);

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
        // id="outlined-select-category"
        select
        label="Category"
        name="category"
        value={recipeFormValues.category}
        onChange={handleOnChange}
        helperText="Please select the recipe type"
      >
        {categories.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          // labelId="demo-simple-select-label"
          // id="demo-simple-select"
          value={recipeFormValues.category}
          label="category"
          onChange={handleOnChange}
        >
          {categories.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Serving Size"
        variant="outlined"
        type="number"
        name="servingSize"
        value={recipeFormValues.servingSize}
        min="0"
        max="30"
        onChange={handleOnChange}
      />
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={2}
        name="description"
        value={recipeFormValues.description}
        onChange={handleOnChange}
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
        name="notes"
        value={recipeFormValues.notes}
        onChange={handleOnChange}
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
