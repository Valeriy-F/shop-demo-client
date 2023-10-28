import App from './app'
import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { blue, blueGrey, deepOrange } from '@mui/material/colors'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme = createTheme({
  palette: {
    background: {
      default: '#efefef'
    }
  }
  // palette: {
  //   primary: {
  //     light: blueGrey[200],
  //     main: blueGrey[500],
  //     dark: blueGrey[800],
  //     contrastText: blueGrey[100]
  //   },
  //   secondary: {
  //     light: blue[200],
  //     main: blue[500],
  //     dark: blue[900],
  //     contrastText: blue[100]
  //   },
  //   success: {
  //     light: deepOrange[200],
  //     main: deepOrange[500],
  //     dark: deepOrange[900],
  //     contrastText: deepOrange[100]
  //   },
  //   text: {
  //     primary: blueGrey[900],
  //     secondary: blueGrey[700]
  //   }
  // },
})

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
