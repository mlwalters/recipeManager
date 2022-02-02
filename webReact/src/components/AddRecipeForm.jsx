import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {
  FormGroup, FormLabel, FormControl, // FormHelperText, InputLabel, Input,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const AddRecipeForm = () => {
  const [recipeFormValues, setRecipeFormValues] = useState({});
  const [categories, setCategories] = useState([{}]);
  const [error, setError] = useState(null);
  const [ingredientInputFields, setIngredientInputFields] = useState([
    { amount: '', item: '' },
  ]);

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

  const handleChangeInput = (id, event) => {
    const newInputFields = ingredientInputFields.map((i) => {
      const ing = i;
      if (id === ing.id) {
        ing[event.target.name] = event.target.value;
      }
      return ing;
    });
    setIngredientInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setIngredientInputFields([...ingredientInputFields, { amount: '', item: '' }]);
  };

  const handleRemoveFields = (id) => {
    const values = [...ingredientInputFields];
    values.splice(values.findIndex((value) => value.id === id), 1);
    setIngredientInputFields(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRecipeFormValues(() => { recipeFormValues.ingredients = ingredientInputFields; });
    setRecipeFormValues(recipeFormValues);
    try {
      await axios.post(`${process.env.REACT_APP_BASE_API}/api/Recipe`, recipeFormValues);
      // console.log(recipeFormValues);
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
      <FormGroup>
        <TextField
          label="Recipe name"
          variant="outlined"
          required
          name="name"
          value={recipeFormValues.name}
          onChange={handleOnChange}
        />
        <TextField
          id="outlined-select-category"
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
          <FormControl>
            <FormLabel>Ingredients</FormLabel>
            { ingredientInputFields.map((ingredientInputField, index) => (
              <div key={ingredientInputField.id}>
                <TextField
                  label="Amount"
                  variant="standard"
                  name="amount"
                  value={ingredientInputField.amount}
                  onChange={(event) => handleChangeInput(ingredientInputField.id, event)}
                />
                <TextField
                  label="Ingredient"
                  variant="standard"
                  name="item"
                  value={ingredientInputField.item}
                  onChange={(event) => handleChangeInput(index, event)}
                />
                <RemoveIcon
                  disabled={ingredientInputField.length === 1}
                  onClick={() => handleRemoveFields(ingredientInputField.id)}
                >
                  <RemoveIcon />
                </RemoveIcon>
                <AddIcon
                  onClick={handleAddFields}
                >
                  <AddIcon />
                </AddIcon>
              </div>
            )) }
          </FormControl>
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
      </FormGroup>

    </Box>
  );
};

export default AddRecipeForm;
