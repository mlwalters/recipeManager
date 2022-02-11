import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Field, Form, Formik, FieldArray,
} from 'formik';
import {
  object, string, number, array,
} from 'yup';
import { useAuth0 } from '@auth0/auth0-react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import {
  FormGroup, FormLabel, FormControl,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const initialValues = {
  name: '',
  userEmail: '',
  category: '',
  servingSize: 0,
  description: '',
  ingredients: [{
    amount: '',
    item: '',
  }],
  instructions: [{ step: '' }],
  notes: '',
};

const AddForm = () => {
  const [categories, setCategories] = useState([{}]);
  const [error, setError] = useState(null);
  const { user } = useAuth0(); // isAuthenticated

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Category`);
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values) => {
    // isAuthenticated &&
    const request = values;
    request.userEmail = user.email;
    try {
      await axios.post(`${process.env.REACT_APP_BASE_API}/api/Recipe`, request);
      // redirect useNavigate
    } catch (err) {
      setError(err);
    }
  };

  if (error) {
    return (
      <div>Oops! Recipe submission failed.</div>
    );
  }

  return (
    <div>
      <h1>Add a new recipe</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          name: string().required('Recipe name is required').min(2, 'Name is too short').max(150, 'Maximum character limit of 150 has been reached'),
          description: string().max(150, 'Maximum character limit of 150 has been reached'),
          servingSize: number().max(25, 'Maximum number accepted is 25'),
          category: number().required('Category is required'),
          instructions: array().of(object().shape({
            step: string().max(350, 'Maximum character limit of 350 has been reached'),
          })),
          ingredients: array().of(object().shape({
            amount: string().max(50, 'Maximum character limit of 50 has been reached'),
            item: string().max(100, 'Maximum character limit of 100 has been reached'),
          })),
          notes: string().max(400, 'Maximum character limit of 400 has been reached'),
        })}
        onSubmit={async (values) => { // , formikHelpers
          handleSubmit(values);
        }}
      >
        {({
          errors, isValid, touched, dirty, values,
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
                <FieldArray
                  name="ingredients"
                  render={(arrayHelpers) => (
                    <div>
                      {values.ingredients && values.ingredients.length > 0 ? (
                        values.ingredients.map((ingredient, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <div key={index}>
                            <Field
                              name={`ingredients.${index}.amount`}
                              label="Amount"
                              as={TextField}
                              variant="outlined"
                              size="small"
                              // error={Boolean(errors.ingredients.amount)
                              //   && Boolean(errors.ingredients.amount)}
                              // helperText={Boolean(touched.amount)
                              //   && errors.amount}
                            />
                            <Field
                              name={`ingredients.${index}.item`}
                              label="Ingredient"
                              as={TextField}
                              variant="outlined"
                              size="small"
                              // error={Boolean(errors.ingredients.item)
                              //   && Boolean(errors.ingredients.item)}
                              // helperText={Boolean(touched.item)
                              //   && errors.item}
                            />
                            {index ? (
                              <RemoveIcon
                                disabled={index.length === 1}
                                onClick={() => arrayHelpers.remove(index)}
                              />
                            ) : null}
                            <AddIcon
                              onClick={() => arrayHelpers.insert(index + 1, '')}
                            />
                          </div>
                        ))
                      ) : null}
                    </div>
                  )}
                />
              </FormControl>
            </FormGroup>
            <Box height={14} />

            <FormGroup>
              <FormControl>
                <FormLabel>Instructions</FormLabel>
                <Box height={14} />
                <FieldArray
                  name="instructions"
                  render={(arrayHelpers) => (
                    <div>
                      {values.instructions && values.instructions.length > 0 ? (
                        values.instructions.map((instruction, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <Box key={index} display="flex">
                            <Typography variant="body2" color="text.secondary">{`Step ${index + 1}`}</Typography>
                            <Field
                              name={`instructions.${index}.step`}
                              label="Step"
                              as={TextField}
                              variant="outlined"
                              size="small"
                              // error={Boolean(errors.step) && Boolean(touched.step)}
                              // helperText={Boolean(touched.step) && errors.step}
                            />
                            {index ? (
                              <RemoveIcon
                                disabled={index.length === 1}
                                onClick={() => arrayHelpers.remove(index)}
                              />
                            ) : null}
                            <AddIcon
                              onClick={() => arrayHelpers.insert(index + 1, { step: '' })}
                            />
                          </Box>
                        ))
                      ) : null}
                    </div>
                  )}
                />
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

export default AddForm;
