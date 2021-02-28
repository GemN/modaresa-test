import React from 'react';
import BrandTable from './Components/BrandTable';

import Grid from "@material-ui/core/Grid";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffb600'
    },
    secondary: {
      main: '#004266'
    }
  }
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Grid container direction="column" justify="center" alignItems="center">
        <h1 style={{marginBottom: 50, marginTop: 50}}>Brand Manager</h1>
        <BrandTable />
      </Grid>
    </MuiThemeProvider>
  );
}

export default App;
