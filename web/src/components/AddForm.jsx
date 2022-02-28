import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Field, Form, Formik, FieldArray,
} from 'formik';
import {
  object, string, number, array,
} from 'yup';
import { useAuth0 } from '@auth0/auth0-react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
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
  imageUrl: '',
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
  const { user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/Category`);
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values) => {
    const request = values;
    request.userEmail = user.email;
    try {
      await axios.post(`${process.env.REACT_APP_BASE_API}/api/Recipe`, request);
      navigate('/');
    } catch (err) {
      setError(err);
    }
  };

  if (error) {
    return (
      <Typography component="p" variant="h6">Oops! Recipe submission failed.</Typography>
    );
  }

  return (
    <Paper elevation={3} marginbottom={5}>
      <Typography variant="h5" padding={1}>Add a new recipe</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          name: string().trim().required('Recipe name is required').min(3, 'Name is too short')
            .max(350, 'Maximum character limit is 350'),
          description: string().trim().max(900, 'Maximum character limit is 900'),
          imageUrl: string().trim().max(350, 'Maximum character limit is 350'),
          servingSize: number().min(0, 'Minimum value is 0').max(100, 'Maximum value is 100'),
          category: number().required('Category is required'),
          instructions: array().of(object().shape({
            step: string().trim().max(950, 'Maximum character limit is 950'),
          })),
          ingredients: array().of(object().shape({
            amount: string().trim().max(50, 'Maximum character limit is 50'),
            item: string().trim().max(200, 'Maximum character limit is 200'),
          })),
          notes: string().trim().max(1500, 'Maximum character limit is 1500'),
        })}
        onSubmit={async (values) => {
          handleSubmit(values);
        }}
      >
        {({
          errors, isValid, touched, dirty, values, resetForm,
        }) => (
          <Form>
            <Field
              label="Recipe name"
              name="name"
              type="text"
              as={TextField}
              required
              fullWidth
              variant="outlined"
              size="small"
              autoComplete="false"
              error={Boolean(errors.name) && Boolean(touched.name)}
              helperText={Boolean(touched.name) && errors.name}
              sx={{ padding: 1 }}
            />

            <Box sx={{ display: 'flex', padding: 1 }}>
              <Field
                label="Category"
                name="category"
                type="category"
                as={TextField}
                data-testid="select-category"
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
                    data-testid="category-dropdown"
                    key={option.value}
                    value={option.id}
                    size="small"
                  >
                    {option.name}
                  </Field>
                ))}
              </Field>
              <Field
                label="Serving Size"
                variant="outlined"
                size="small"
                type="number"
                fullWidth
                as={TextField}
                name="servingSize"
                data-testid="Serving Size"
                error={Boolean(errors.servingSize) && Boolean(touched.servingSize)}
                helperText={Boolean(touched.servingSize) && errors.servingSize}
                sx={{ paddingLeft: 1 }}
              />
            </Box>

            <Field
              label="Description"
              name="description"
              type="description"
              as={TextField}
              variant="outlined"
              size="small"
              multiline
              fullWidth
              rows={2}
              data-testid="Description"
              error={Boolean(errors.description) && Boolean(touched.description)}
              helperText={Boolean(touched.description) && errors.description}
              sx={{ padding: 1 }}
            />

            <FormGroup sx={{ padding: 1 }}>
              <FormControl>
                <FormLabel>Ingredients</FormLabel>
                <FieldArray
                  name="ingredients"
                  render={(arrayHelpers) => (
                    <div>
                      {values.ingredients && values.ingredients.length > 0 ? (
                        values.ingredients.map((ingredient, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <Box key={index} sx={{ display: 'flex', padding: 1 }}>
                            <Field
                              name={`ingredients.${index}.amount`}
                              label="Amount"
                              as={TextField}
                              variant="outlined"
                              size="small"
                              sx={{ width: '35%' }}
                            />
                            <Field
                              name={`ingredients.${index}.item`}
                              label="Ingredient"
                              as={TextField}
                              variant="outlined"
                              size="small"
                              fullWidth
                              sx={{ width: '55%', paddingLeft: 1 }}
                            />
                            <Box sx={{ width: '5%', paddingLeft: 1, paddingTop: 1 }}>
                              <AddIcon
                                data-testid="add-icon-ingredient"
                                onClick={() => arrayHelpers.insert(index + 1, '')}
                              />
                            </Box>
                            {index ? (
                              <Box sx={{ width: '5%', paddingLeft: 1, paddingTop: 1 }}>
                                <RemoveIcon
                                  data-testid="remove-icon-ingredient"
                                  disabled={index.length === 1}
                                  onClick={() => arrayHelpers.remove(index)}
                                />
                              </Box>
                            ) : null}
                          </Box>
                        ))
                      ) : null}
                    </div>
                  )}
                />
              </FormControl>
            </FormGroup>

            <FormGroup sx={{ padding: 1 }}>
              <FormControl>
                <FormLabel>Instructions</FormLabel>

                <FieldArray
                  name="instructions"
                  render={(arrayHelpers) => (
                    <div>
                      {values.instructions && values.instructions.length > 0 ? (
                        values.instructions.map((instruction, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <Box key={index} sx={{ display: 'flex', padding: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ paddingTop: 1.25, paddingLeft: 1 }}>
                              {`# ${index + 1}`}
                            </Typography>
                            <Field
                              name={`instructions.${index}.step`}
                              label="Step"
                              as={TextField}
                              variant="outlined"
                              size="small"
                              sx={{ width: '87.5%', paddingLeft: 1.25 }}
                            />
                            <Box sx={{ width: '2.5%', paddingLeft: 1, paddingTop: 1 }}>
                              <AddIcon
                                data-testid="add-icon-instruction"
                                onClick={() => arrayHelpers.insert(index + 1, { step: '' })}
                              />
                            </Box>
                            {index ? (
                              <Box sx={{ width: '2.5%', paddingLeft: 5, paddingTop: 1 }}>
                                <RemoveIcon
                                  data-testid="remove-icon-instruction"
                                  disabled={index.length === 1}
                                  onClick={() => arrayHelpers.remove(index)}
                                />
                              </Box>
                            ) : null}
                          </Box>
                        ))
                      ) : null}
                    </div>
                  )}
                />
              </FormControl>
            </FormGroup>

            <Field
              label="Image URL"
              name="imageUrl"
              type="imageUrl"
              as={TextField}
              variant="outlined"
              size="small"
              multiline
              fullWidth
              rows={2}
              data-testid="Image"
              error={Boolean(errors.imageUrl) && Boolean(touched.imageUrl)}
              helperText={Boolean(touched.imageUrl) && errors.imageUrl}
              sx={{ padding: 1 }}
            />

            <Field
              label="Notes"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={5}
              as={TextField}
              name="notes"
              data-testid="Serving Size"
              error={Boolean(errors.notes) && Boolean(touched.notes)}
              helperText={Boolean(touched.notes) && errors.notes}
              sx={{ padding: 1 }}
            />

            <Box sx={{
              display: 'flex', padding: 1, paddingTop: 3, paddingBottom: 3, marginBottom: 5,
            }}
            >
              <Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  disabled={!isValid || !dirty}
                >
                  Add Recipe
                </Button>
              </Box>
              <Box sx={{ paddingLeft: 1 }}>
                <Button variant="outlined" color="secondary" size="large" disabled={!dirty} type="reset" onClick={resetForm}>Reset</Button>
              </Box>
            </Box>

          </Form>
        )}
      </Formik>
    </Paper>
  );
};

export default AddForm;
