import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import GroceryList from '../../components/GroceryList';
import AddGroceryItemForm from '../../components/AddGroceryItemForm';
import LoadingDisplay from '../../components/loading-display/LoadingDisplay';
import BackToHomeBtn from '../../components/navigation/back-to-home/BackToHomeBtn';

const GroceryListPage = () => {
  // const [open, setOpen] = useState(false);
  const [groceryItems, setGroceryItems] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [saveItemError, setSaveItemError] = useState(null);
  // const [isChecked, setIsChecked] = useState([0]);
  const { user } = useAuth0();

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setSaveItemError(false);
  };

  const handleSubmitAddModal = async (item) => {
    const request = item;
    request.userEmail = user.email;
    try {
      const newGroceryItem = await axios.post(`${process.env.REACT_APP_BASE_API}/api/GroceryList/Add`, request);
      setGroceryItems([...groceryItems, newGroceryItem]);
      setSaveItemError(null);
      handleCloseAddModal();
      // window.alert('Item saved!');
    } catch (err) {
      setSaveItemError(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/GroceryList/All/${user.email}`);
        setGroceryItems(data);
        // eslint-disable-next-line no-console
        console.log(groceryItems);
      } catch (err) {
        setFetchError(err);
      }
      setLoadingState(false);
    };
    fetchData();
  }, []);

  if (loadingState) {
    return (
      <LoadingDisplay />
    );
  }

  if (fetchError) {
    return (
      <Typography variant="h6">Oops! Could not fetch recipe cards.</Typography>
    );
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ marginBottom: 10 }}>
        <BackToHomeBtn />
        <Box sx={{
          width: '100%', maxWidth: 500, paddingTop: 2, paddingBottom: 2,
        }}
        >
          <Typography variant="h3">Grocery List</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsAddModalOpen(true)}>Add an item</Button>
        {isAddModalOpen && (
          <AddGroceryItemForm
            saveError={saveItemError}
            onSubmit={handleSubmitAddModal}
            handleClose={handleCloseAddModal}
          />
        )}
        <GroceryList items={groceryItems} fetchError={fetchError} />
      </Container>
    </>
  );
};
export default GroceryListPage;
