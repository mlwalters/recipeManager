import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Field, Form, Formik,
} from 'formik';
import {
  object, string,
} from 'yup';

const initialValues = {
  name: '',
  userEmail: '',
};

const AddGroceryItemForm = () => {
  const [open, setOpen] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const { user } = useAuth0();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values) => {
    const request = values;
    request.userEmail = user.email;
    try {
      await axios.post(`${process.env.REACT_APP_BASE_API}/api/Recipe`, request);
      // window.alert('Item saved!');
    } catch (err) {
      setSubmitError(err);
    }
  };

  if (submitError) {
    return (
      <Typography component="p" variant="h6">Oops! Recipe submission failed.</Typography>
    );
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add an item
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Add a grocery item
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
          <Formik
            initialValues={initialValues}
            validationSchema={object({
              itemName: string().trim().required('Item name is required').min(3, 'Name is too short')
                .max(350, 'Maximum character limit is 350'),
            })}
            onSubmit={async (values) => {
              handleSubmit(values);
            }}
          >
            {({
              errors, touched, // isValid, touched, dirty, values, resetForm,
            }) => (
              <Form>
                <Field
                  label="Name"
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
                {/*
              <Box sx={{ display: 'flex', padding: 1 }}>
                <Field
                  label="Category *"
                  name="category"
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
              </Box> */}

              </Form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddGroceryItemForm;
