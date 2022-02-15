/* eslint-disable react/jsx-props-no-spreading */

// eslint-disable-next-line no-unused-vars
import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import { createTheme } from '@mui/material';

const primary = '#74bdcb'; // aquamarine
// const otherPrimary = '#ffa384'; // salmon
const secondary = '#e7f2f8'; // baby blue
// const otherSecondary = '#efe7bc'; //freesia
const error = '#F44336';
const textPrimary = '#313438';

const theme = createTheme({
  palette: {
    // type: 'light',
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    error: {
      main: error,
    },
  },
  typography: {
    fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: 'hover',
        // component: React.forwardRef(({ href, ...other }, ref) => (
        //   <RouterLink ref={ref} to={href} {...other} />
        // )),
      },
      styleOverrides: {
        root: {
          color: textPrimary,
          cursor: 'pointer',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        },
      },
    },
  },
});

export default theme;
