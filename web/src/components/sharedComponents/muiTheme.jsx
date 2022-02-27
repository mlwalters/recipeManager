// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createTheme } from '@mui/material';
import Merriweather from '../../assets/fonts/Merriweather,Merriweather_Sans/Merriweather/Merriweather-Bold.ttf';

const theme = createTheme({
  typography: {
    fontFamily: 'Merriweather, Merriweather Sans, Roboto',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Merriweather';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Merriweather'), local('Merriweather-Bold'), url(${Merriweather}) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});

export default theme;
