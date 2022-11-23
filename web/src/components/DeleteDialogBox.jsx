import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';

// onClick = event => do stuff

const DeleteDialogBox = ({ onCancel, onDelete }) => (
  <Dialog
    open
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    BackdropProps={{
      style: {
        backgroundColor: '#000009', opacity: 0.10,
      },
    }}
    PaperProps={{
      style: {
        boxShadow: '0px 11px 15px -7px rgba(0,0,0,0.03),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 36px 8px rgba(0,0,0,0.02)',
      },
    }}
  >
    <DialogTitle id="alert-dialog-title">
      Delete selected recipe
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to delete this recipe?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Cancel</Button>
      <Button data-testid="dialogBoxDelete" onClick={onDelete}>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

DeleteDialogBox.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteDialogBox;
