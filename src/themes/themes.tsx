'use client';
import { Roboto, Rubik } from 'next/font/google';
import {grey} from "@mui/material/colors"
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const rubik = Rubik({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: rubik.style.fontFamily,
  },
  palette: {
    primary: {
      main: "#5372ef"
    },
    secondary: {
      main: grey[600]
    }
  }
});
export default theme;