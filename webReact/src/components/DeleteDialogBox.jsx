import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
} from '@mui/material';

import DialogContentText from '@mui/material/DialogContentText';

const DeleteDialogBox = ({ onCancel, onDelete }) => (
  <div>
    <Dialog
      open
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Delete selected recipe?
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
  </div>
);

DeleteDialogBox.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteDialogBox;
