import axios from 'axios';
import React, { useState, useEffect } from 'react';
// import {
//   object, string, number, array,
// } from 'yup';

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
  // const [err, setErr] = useState(null);
  const [ingredientInputFields, setIngredientInputFields] = useState([
    { amount: '', item: '' },
  ]);
  const [instructionInputFields, setInstructionInputFields] = useState([
    { stepNumber: 1, step: '' },
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

  // const recipeFormSchema = object().shape({
  //   name: string().required('Recipe name is required'),
  //   description: string().max(150, 'Character limit: 150'),
  //   servingSize: number().max(25, 'Maximum number() accepted is 25'),
  //   category: number().required('Category is required'),
  //   instructions: array().of(object.shape({
  //     stepNumber: number(),
  //     step: string().max(350, 'Maximum character limit (350) has been reached'),
  //   })),
  //   ingredients: array().of(object().shape({
  //     amount: string().max(50, 'Maximum character limit (100) has been reached'),
  //     item: string().max(100, 'Maximum character limit (100) has been reached'),
  //   })),
  //   notes: string().max(400, 'Maximum character limit (350) has been reached'),
  // });

  const handleChangeInput = (item, event) => {
    const newInputFields = ingredientInputFields.map((i) => {
      const ing = i;
      if (item === ing.item) {
        ing[event.target.name] = event.target.value;
      }
      return ing;
    });
    setIngredientInputFields(newInputFields);
  };

  const handleChangeInputIns = (stepNumber, event) => {
    const newInsInputFields = instructionInputFields.map((i) => {
      const ins = i;
      if (stepNumber === ins.stepNumber) {
        ins[event.target.name] = event.target.value;
      }
      return ins;
    });
    setInstructionInputFields(newInsInputFields);
  };

  const handleAddFields = () => {
    setIngredientInputFields([...ingredientInputFields, { amount: '', item: '' }]);
  };
  const handleAddFieldsIns = () => {
    setInstructionInputFields([...instructionInputFields, { step: '' }]);
  };

  const handleRemoveFields = (item) => {
    const values = [...ingredientInputFields];
    values.splice(values.findIndex((value) => value.item === item), 1);
    setIngredientInputFields(values);
  };
  const handleRemoveFieldsIns = (stepNumber) => {
    const values = [...instructionInputFields];
    values.splice(values.findIndex((value) => value.stepNumber === stepNumber), 1);
    setInstructionInputFields(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRecipeFormValues(() => { recipeFormValues.ingredients = ingredientInputFields; });
    setRecipeFormValues(() => { recipeFormValues.instructions = instructionInputFields; });
    setRecipeFormValues(recipeFormValues);
    // try {
    //   await axios.post(`${process.env.REACT_APP_BASE_API}/api/Recipe`, recipeFormValues);
    //   // console.log(recipeFormValues);
    // } catch (submitError) {
    //   setErr(submitError);
    // }
    console.log(recipeFormValues);
  };

  // if (err) {
  //   return (
  //     <div>Oops! Could not fetch recipe list.</div>
  //   );
  // }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, p: 1, width: '60ch' },
      }}
      // noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <FormGroup>
        <TextField
          label="Recipe name"
          variant="outlined"
          required
          name="name"
          data-testid="Recipe name"
          value={recipeFormValues.name}
          onChange={handleOnChange}
          // helperText={recipeFormSchema.name}
        />
        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={2}
          name="description"
          data-testid="Description"
          value={recipeFormValues.description || ''}
          onChange={handleOnChange}
        />
        <TextField
          // id="outlined-select-category"
          select
          label="Category"
          name="category"
          data-testid="Category"
          value={recipeFormValues.category || ''}
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
          data-testid="Serving Size"
          value={recipeFormValues.servingSize || 0}
          onChange={handleOnChange}
        />
        <FormGroup>
          <FormControl>
            <FormLabel>Ingredients</FormLabel>
            {ingredientInputFields.map((ingredientInputField, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <TextField
                  label="Amount"
                  variant="standard"
                  name="amount"
                  value={ingredientInputField.amount}
                  onChange={(event) => handleChangeInput(ingredientInputField.item, event)}
                />
                <TextField
                  label="Ingredient"
                  variant="standard"
                  name="item"
                  value={ingredientInputField.item}
                  onChange={(event) => handleChangeInput(ingredientInputField.item, event)}
                />
                {index ? (
                  <RemoveIcon
                    disabled={ingredientInputField.length === 1}
                    onClick={() => handleRemoveFields(ingredientInputField.item)}
                  />
                ) : null}
                <AddIcon
                  onClick={handleAddFields}
                />
              </div>
            ))}
          </FormControl>
        </FormGroup>
        <FormGroup>
          <FormControl>
            <FormLabel>Instructions</FormLabel>
            {instructionInputFields.map((instructionField, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <TextField
                  label="Step #"
                  variant="standard"
                  name="stepNumber"
                  value={index + 1}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Step"
                  variant="standard"
                  name="step"
                  value={instructionField.step}
                  onChange={(event) => handleChangeInputIns(instructionField.stepNumber, event)}
                />
                {index ? (
                  <RemoveIcon
                    disabled={instructionField.length === 1}
                    onClick={() => handleRemoveFieldsIns(instructionField.step)}
                  />
                ) : null}
                <AddIcon
                  onClick={handleAddFieldsIns}
                />
              </div>
            ))}
          </FormControl>
        </FormGroup>
        <TextField
          label="Notes"
          variant="outlined"
          multiline
          rows={3}
          name="notes"
          value={recipeFormValues.notes || ''}
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
