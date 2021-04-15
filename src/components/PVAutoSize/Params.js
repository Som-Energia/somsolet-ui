import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import MapIcon from '@material-ui/icons/MapOutlined'

const Params = () => {
  const classes = useStyles()
  const { t } = useTranslation()

  const handleClick = () => {}

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <InputLabel id="powerLabel" className={classes.label}>
            {t('POWER')}
          </InputLabel>
          <Select
            id="powerLabel"
            fullWidth
            variant="outlined"
            label={t('POWER')}
            notched={false}
            className={classes.select}
            startAdornment={
              <InputAdornment position="start">kW</InputAdornment>
            }
          >
            <MenuItem value={1.6}>1,6</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <InputLabel id="surfaceLabel" className={classes.label}>
            {t('SURFACE')}
          </InputLabel>
          <TextField
            id="surfaceLabel"
            fullWidth
            variant="outlined"
            className={classes.textfield}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MapIcon color="secondary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">&#13217;</InputAdornment>
              ),
            }}
          >
            <MenuItem value={1.6}>1,6</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <InputLabel id="inclinationLabel" className={classes.label}>
            {t('INCLINATION')}
          </InputLabel>
          <Select
            id="inclinationLabel"
            fullWidth
            variant="outlined"
            label={t('INCLINATION')}
            notched={false}
            className={classes.select}
            startAdornment={
              <InputAdornment position="start">graus</InputAdornment>
            }
          >
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={45}>45</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <InputLabel id="orientationLabel" className={classes.label}>
            {t('ORIENTATION')}
          </InputLabel>
          <Select
            id="orientationLabel"
            fullWidth
            variant="outlined"
            label={t('ORIENTATION')}
            notched={false}
            className={classes.select}
            startAdornment={
              <InputAdornment position="start">
                <MapIcon color="secondary" />
              </InputAdornment>
            }
          >
            <MenuItem value="N">N</MenuItem>
            <MenuItem value="NE">NE</MenuItem>
            <MenuItem value="E">E</MenuItem>
            <MenuItem value="SE">SE</MenuItem>
            <MenuItem value="S">S</MenuItem>
            <MenuItem value="SO">SO</MenuItem>
            <MenuItem value="O">O</MenuItem>
            <MenuItem value="NO">NO</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <div className={classes.buttonContainer}>
        <Button
          fullWidth
          color="primary"
          size="large"
          disableElevation
          variant="contained"
          className={classes.button}
          endIcon={<NavigateNextIcon />}
          onClick={handleClick}
          disabled
        >
          {t('CALCULATE')}
        </Button>
      </div>
    </div>
  )
}

export default Params

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#fff',
    paddingTop: '16px',
    paddingBottom: '16px',
  },
  label: {
    fontSize: '0.9rem',
    marginBottom: '8px',
  },
  buttonContainer: {
    paddingTop: '2rem',
  },
  button: {
    '& .MuiButton-label': {
      textTransform: 'none',
      justifyContent: 'space-between',
      fontSize: '1rem',
    },
  },
  select: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: '2px solid #9abd20 !important',
    },
  },
  textfield: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: '2px solid #9abd20 !important',
    },
  },
}))
