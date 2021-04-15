import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#96b633',
    },
    secondary: {
      main: '#a1a1a1',
    },
    backgroundColor: '#ffffff',
    contrastThreshold: 2,
    tonalOffset: 0.2,
  },
  typography: {
    htmlFontSize: 16,
  },
  shape: {
    borderRadius: '0',
  },
  text: {
    primary: '#4d4d4d',
  },
  zIndex: {
    modal: 1600,
  },
})
