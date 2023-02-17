import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import GroceryList from './GroceryList';
import AddGroceryItemForm from '../sharedComponents/forms/AddGroceryItemForm';
import LoadingDisplay from '../sharedComponents/LoadingDisplay';
import BackToHomeBtn from '../sharedComponents/BackToHomeBtn';
import Toast, { variants } from '../sharedComponents/toast/Toast';
import NotFound from '../sharedComponents/error/NotFound';

const GroceryListPage = () => {
  const [groceryItems, setGroceryItems] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [saveItemError, setSaveItemError] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState(variants.info);
  const { user } = useAuth0();

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
    setSaveItemError(null);
  };

  const handleSubmitAddModal = async (item) => {
    if (item.itemName.trim() === '') {
      setSaveItemError('Item can not be empty');
    } else if (groceryItems.find((i) => i.name === item.itemName)) {
      setSaveItemError('Item is already in the list');
    } else {
      const request = item;
      request.userEmail = user.email;
      try {
        const newGroceryItem = await axios.post(`${process.env.REACT_APP_BASE_API}/api/GroceryItems/Add`, request);
        setGroceryItems([...groceryItems, newGroceryItem.data]);
        setSaveItemError(null);
        handleCloseAddModal();
        setToastMessage('Added new item');
        setToastVariant(variants.success);
      } catch (err) {
        setSaveItemError('Oops! Could not save item. Please try again.');
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_API}/api/GroceryItems/All/${user.email}`);
        setGroceryItems(data);
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
      <Container maxWidth="lg">
        <BackToHomeBtn />
        <NotFound />
      </Container>
    );
  }

  if (saveItemError) {
    handleCloseAddModal();
    setToastMessage(saveItemError);
    setToastVariant(variants.error);
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ marginBottom: 10 }}>
        <BackToHomeBtn />
        <Box sx={{
          width: '100%', maxWidth: 500, paddingTop: 2, paddingBottom: 2,
        }}
        >
          <div>
            Last rendered
            {' '}
            {new Date().toLocaleTimeString()}
          </div>
          <Typography variant="h3">
            Grocery List (
            {groceryItems.length}
            )
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsAddModalOpen(true)}>Add an item</Button>
        {isAddModalOpen && (
          <AddGroceryItemForm
            saveError={saveItemError}
            onSubmit={handleSubmitAddModal}
            handleClose={handleCloseAddModal}
          />
        )}
        <GroceryList
          items={groceryItems.sort((a, b) => a.name.localeCompare(b.name))}
        />
        <Toast
          onClose={() => setToastMessage('')}
          message={toastMessage}
          variant={toastVariant}
        />
      </Container>
    </>
  );
};
export default GroceryListPage;
