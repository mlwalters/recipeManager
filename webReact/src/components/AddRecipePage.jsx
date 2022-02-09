import React from 'react';
import FormikForm from './FormikForm';
// import AddRecipeForm from './AddRecipeForm';
import SampleForm from './SampleForm';
import FormikForm2 from './Formik2';
import NavBar from './sharedComponents/NavBar';

const AddRecipePage = () => (
  <>
    <NavBar />
    {/* <AddRecipeForm /> */}
    <FormikForm />
    <SampleForm />
    <FormikForm2 />
  </>
);

export default AddRecipePage;
