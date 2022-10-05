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
    <div>
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
    </div>
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

// WITH FORMIK
// // import React, { useState } from 'react';
// import React from 'react';
// import PropTypes from 'prop-types';
// // import axios from 'axios';
// import Button from '@mui/material/Button';
// // import Paper from '@mui/material/Paper';
// import Alert from '@mui/material/Alert';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// // import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import TextField from '@mui/material/TextField';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// // import Typography from '@mui/material/Typography';
// // import { useAuth0 } from '@auth0/auth0-react';
// import {
//   Field, Form, Formik,
// } from 'formik';
// import {
//   object, string,
// } from 'yup';

// const AddGroceryItemForm = ({
//   saveError,
//   onSubmit,
//   handleClose,
// }) => {
//   const initialValues = {
//     name: '',
//     userEmail: '',
//   };
//   return (
//     <div>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={object({
//           itemName: string().trim().required('Item name is required').min(3, 'Name is too short')
//             .max(350, 'Maximum character limit is 350'),
//         })}
//         onSubmit={async (values) => {
//           onSubmit(values);
//         }}
//       >
//         {({
//           errors, touched, isValid, dirty, // values, // resetForm,
//         }) => (
//           <Form>
//             <Dialog
//               open
//               onClose={handleClose}
//               aria-labelledby="alert-dialog-title"
//               aria-describedby="alert-dialog-description"
//             >
//               <DialogTitle id="alert-dialog-title">
//                 Add Grocery Item
//                 <IconButton
//                   aria-label="close"
//                   alt="close"
//             // sx={{
//             //   position: 'absolute',
//             //   right: 8,
//             //   top: 8,
//             //   color: (theme) => theme.palette.grey[500],
//             // }}
//                   onClick={handleClose}
//                 >
//                   <CloseIcon />
//                 </IconButton>
//               </DialogTitle>
//               <DialogContent>
//                 {!!saveError && <Alert severity="error">{saveError}</Alert>}
//                 <Field
//                   label="Name"
//                   name="name"
//                   type="text"
//                   as={TextField}
//                   autoFocus
//                   required
//                   fullWidth
//                   variant="standard"
//                   sx={{ width: { sm: 300, md: 400 } }}
//                   autoComplete="false"
//                   placeholder="Eggs"
//                   error={Boolean(errors.name) && Boolean(touched.name)}
//                   helperText={Boolean(touched.name) && errors.name}
//                 />
//                 {/* </Formik> */}
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={handleClose}>Cancel</Button>
//                 <Button type="submit" disabled={!isValid || !dirty}>Save</Button>
//                 {/* onClick={onSubmit} */}
//               </DialogActions>
//             </Dialog>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// AddGroceryItemForm.defaultProps = {
//   saveError: undefined,
//   onSubmit: undefined,
//   handleClose: undefined,
// };

// AddGroceryItemForm.propTypes = {
//   onSubmit: PropTypes.func,
//   handleClose: PropTypes.func,
//   saveError: PropTypes.string,
// };

// export default AddGroceryItemForm;
