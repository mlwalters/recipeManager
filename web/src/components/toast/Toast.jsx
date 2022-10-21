import React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import PropTypes from 'prop-types';

export const variants = Object.freeze({
  info: 'info',
  error: 'error',
  warning: 'warning',
  success: 'success',
});

const Toast = ({
  message, onClose, variant,
}) => (
  <Snackbar
    open={!!message}
    autoHideDuration={5000}
    onClose={onClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  >
    <Alert onClose={onClose} severity={variant}>{message}</Alert>
  </Snackbar>
);

Toast.defaultProps = {
  variant: 'info',
  message: '',
};

Toast.propTypes = {
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string,
  variant: PropTypes.oneOf(Object.values(variants)),
};

export default Toast;
