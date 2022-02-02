import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {
  FormGroup, FormLabel, // FormControl, FormHelperText, InputLabel, Input,
} from '@mui/material';

const AddRecipeForm = () => {
  const [recipeFormValues, setRecipeFormValues] = useState({});
  const [categories, setCategories] = useState([{}]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Category`);
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRecipeFormValues(recipeFormValues);
    try {
      await axios.post(`${process.env.REACT_APP_BASE_API}/api/Recipe`, recipeFormValues);
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
          <MenuItem key={option.value} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
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
      <FormGroup>
        <FormLabel>Ingredients</FormLabel>
        <TextField
          label="Amount"
          variant="standard"
          name="amount"
          value={recipeFormValues.ingredients}
          onChange={handleOnChange}
        />
        <TextField
          label="Ingredient"
          variant="standard"
          name="ingredient"
          value={recipeFormValues.ingredients}
          onChange={handleOnChange}
        />
        <Button
          // type="submit"
          size="small"
          color="secondary"
          variant="contained"
        >
          Add ingredient
        </Button>
      </FormGroup>
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
