import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const AddGroceryItemForm = ({
  saveError,
  onSubmit,
  handleClose,
}) => {
  const [item, setItem] = useState('');
  const onInputChange = (event) => {
    setItem(event.target.value);
  };
  return (
    <Dialog
      open
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Add Grocery Item
        <IconButton
          aria-label="close"
          alt="close"
            // sx={{
            //   position: 'absolute',
            //   right: 8,
            //   top: 8,
            //   color: (theme) => theme.palette.grey[500],
            // }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {!!saveError && <Alert severity="error">{saveError}</Alert>}
        <TextField
          autoFocus
          label="Name"
          name="name"
          type="text"
          required
          fullWidth
          variant="standard"
          sx={{ width: { sm: 300, md: 400 } }}
          autoComplete="false"
          placeholder="Eggs"
          onChange={onInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" onClick={() => onSubmit({ name: item })}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

AddGroceryItemForm.defaultProps = {
  saveError: undefined,
  onSubmit: undefined,
  handleClose: undefined,
};

AddGroceryItemForm.propTypes = {
  onSubmit: PropTypes.func,
  handleClose: PropTypes.func,
  saveError: PropTypes.string,
};

export default AddGroceryItemForm;
