import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Field, Form, Formik, // FieldArray,
} from 'formik';
import {
  object, string, number, array,
} from 'yup';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {
  FormGroup, FormLabel, FormControl, // FormHelperText, InputLabel, Input,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const initialValues = {
  name: '',
  category: '',
  servingSize: 0,
  description: '',
  ingredients: [{
    amount: '',
    item: '',
  }],
  instructions: [{
    stepNumber: 1,
    step: '',
  }],
  notes: '',
};

const FormikForm = () => {
  // const [values, setValues] = useState(null);
  const [categories, setCategories] = useState([{}]);
  // const [ingredientInputFields, setIngredientInputFields] = useState([
  //   { amount: '', item: '' },
  // ]);
  // const [ingredients, setIngredients] = useState([
  //   { amount: '', item: '' },
  // ]);
  const [instructionInputFields, setInstructionInputFields] = useState([
    { stepNumber: 1, step: '' },
  ]);

  // const handleAddFields = () => {
  //   setIngredientInputFields([...ingredientInputFields, { amount: '', item: '' }]);
  // };
  const handleAddFieldsIns = () => {
    setInstructionInputFields([...instructionInputFields, { step: '' }]);
  };

  // const handleRemoveFields = (item) => {
  //   const values = [...ingredientInputFields];
  //   values.splice(values.findIndex((value) => value.item === item), 1);
  //   setIngredientInputFields(values);
  // };
  const handleRemoveFieldsIns = (stepNumber) => {
    const values = [...instructionInputFields];
    values.splice(values.findIndex((value) => value.stepNumber === stepNumber), 1);
    setInstructionInputFields(values);
  };

  // const onChangeIngredients = (e, field, values, setValues) => {
  //   // update dynamic form
  //   const ingredients = [...values.ingredients];

  //   setValues({ ...values, ingredients });

  //   // call formik onChange method
  //   field.onChange(e);
  // };
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Category`);
      setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h1>Add a new recipe</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          name: string().required('Recipe name is required').min(2, 'Name is too short'),
          description: string().max(150, 'Character limit: 150'),
          servingSize: number().max(25, 'Maximum number() accepted is 25'),
          category: number().required('Category is required'),
          instructions: array().of(object().shape({
            stepNumber: number(),
            step: string().max(350, 'Maximum character limit of 350 has been reached'),
          })),
          ingredients: array().of(object().shape({
            amount: string().max(50, 'Maximum character limit of 100 has been reached'),
            item: string().max(100, 'Maximum character limit of 100 has been reached'),
          })),
          notes: string().max(400, 'Maximum character limit of 350 has been reached'),
        })}
        onSubmit={(values, formikHelpers) => setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          formikHelpers.resetForm();
        }, 500)}
      >
        {({
          errors, isValid, touched, dirty,
        }) => (
          <Form>
            <Field
              label="Recipe name"
              name="name"
              type="text"
              as={TextField}
              required
              data-testid="Recipe name"
              variant="outlined"
              size="small"
              error={Boolean(errors.name) && Boolean(touched.name)}
              helperText={Boolean(touched.name) && errors.name}
            />
            <Box height={14} />

            <Field
              label="Description"
              name="description"
              type="description"
              as={TextField}
              variant="outlined"
              size="small"
              multiline
              rows={2}
              data-testid="Description"
              error={Boolean(errors.description) && Boolean(touched.description)}
              helperText={Boolean(touched.description) && errors.description}
            />
            <Box height={14} />
            <Field
              label="Category"
              name="category"
              type="category"
              as={TextField}
              select
              fullWidth
              variant="outlined"
              size="small"
              error={Boolean(errors.category) && Boolean(touched.category)}
              helperText={Boolean(touched.category) && errors.category}
            >
              {categories.map((option) => (
                <Field
                  as={MenuItem}
                  key={option.value}
                  value={option.id}
                >
                  {option.name}
                </Field>
              ))}
            </Field>
            <Box height={14} />

            <Field
              label="Serving Size"
              variant="outlined"
              size="small"
              type="number"
              as={TextField}
              name="servingSize"
              data-testid="Serving Size"
              error={Boolean(errors.servingSize) && Boolean(touched.servingSize)}
              helperText={Boolean(touched.servingSize) && errors.servingSize}
            />
            <Box height={14} />

            <FormGroup>
              <FormControl>
                <FormLabel>Ingredients</FormLabel>
                <Box height={14} />
                {/* <FieldArray name="ingredients">
                  {() => (values.ingredients.map((ingredient, index) => {
                    const ingredientsErrors = errors.ingredients.length
                        && (errors.ingredients[index] || {});
                    const ingredientsTouched = touched.ingredients.length
                        && (touched.ingredients[index] || {});
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <div key={index}>
                        <Field
                          label="Amount"
                          as={TextField}
                          variant="outlined"
                          size="small"
                          name="amount"
                            // value={ingredientInputField.amount}
                          error={Boolean(ingredientsErrors.amount)
                              && Boolean(ingredientsTouched.amount)}
                          helperText={Boolean(touched.amount)
                              && errors.amount}
                        />
                        <Field
                          label="Ingredient"
                          as={TextField}
                          variant="outlined"
                          size="small"
                          name="item"
                          // value={ingredientInputField.item}
                          error={Boolean(errors.item) && Boolean(touched.item)}
                          helperText={Boolean(touched.item) && errors.item}
                        />
                      </div>
                    );
                  }))}
                </FieldArray> */}
              </FormControl>
            </FormGroup>
            <Box height={14} />

            <FormGroup>
              <FormControl>
                <FormLabel>Instructions</FormLabel>
                <Box height={14} />
                {instructionInputFields.map((instructionField, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={index}>
                    <TextField
                      label="Step #"
                      variant="outlined"
                      size="small"
                      name="stepNumber"
                      value={index + 1}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      label="Step"
                      variant="outlined"
                      size="small"
                      name="step"
                      // value={instructionField.step}
                      error={Boolean(errors.step) && Boolean(touched.step)}
                      helperText={Boolean(touched.step) && errors.step}
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
            <Box height={14} />

            <Field
              label="Notes"
              variant="outlined"
              size="small"
              multiline
              rows={5}
              as={TextField}
              name="notes"
              data-testid="Serving Size"
              error={Boolean(errors.notes) && Boolean(touched.notes)}
              helperText={Boolean(touched.notes) && errors.notes}
            />
            <Box height={14} />

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              disabled={!isValid || !dirty}
            >
              Add Recipe
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;
