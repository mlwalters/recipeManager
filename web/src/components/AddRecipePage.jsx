import React from 'react';
import Container from '@mui/material/Container';
import AddForm from './AddForm';
// import NavBar from './sharedComponents/NavBar';

const AddRecipePage = () => (
  // <>
  //   <NavBar />
  //   <Container maxWidth="lg">
  //     <AddForm />
  //   </Container>
  // </>
  <Container maxWidth="lg">
    {/* <NavBar /> */}
    <AddForm />
  </Container>
);

export default AddRecipePage;
