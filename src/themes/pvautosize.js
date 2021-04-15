import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7da100',
    },
    secondary: {
      main: '#a1a1a1',
    },
    backgroundColor: '#b9db42',
    contrastThreshold: 2,
    tonalOffset: 0.2,
  },
  typography: {
    htmlFontSize: 16,
  },
  text: {
    primary: '#4d4d4d',
  },
  zIndex: {
    modal: 1600,
  },
})
