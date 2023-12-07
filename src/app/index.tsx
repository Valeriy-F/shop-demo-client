import { Routing } from '../pages'
import { blue, blueGrey, deepOrange } from '@mui/material/colors'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'

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

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
