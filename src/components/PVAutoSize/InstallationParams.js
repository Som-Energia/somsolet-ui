import React, { useState, useEffect } from 'react'
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

import { getPVScenario } from '../../services/pvautosize/api'

const InstallationParams = (props) => {
  const { params, token, contract, setParams } = props
  const classes = useStyles()
  const { t } = useTranslation()

  const [power, setPower] = useState()
  const [tilt, setTilt] = useState()
  const [haveInstallParams, setHaveInstallParams] = useState()

  const handleChangePower = (value) => {
    setPower(value.target.value)
  }

  const handleChangeTilt = (value) => {
    setTilt(value.target.value)
  }

  const handleClick = async () => {
    const installationParams = { ...params, tilt, power }
    const scenario = await getPVScenario({
      token,
      contract,
      installationParams,
    })
    setParams({ scenario })
  }

  useEffect(() => {
    const haveValues = params.surface && params.orientation && tilt && power
    setHaveInstallParams(haveValues)
  }, [params, tilt, power])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <InputLabel id="powerLabel" className={classes.label}>
            {t('POWER_PEAK')}
          </InputLabel>
          <Select
            id="powerLabel"
            fullWidth
            variant="outlined"
            label={t('POWER_PEAK')}
            notched={false}
            className={classes.select}
            onChange={handleChangePower}
            startAdornment={
              <InputAdornment position="start">kWp</InputAdornment>
            }
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={2.5}>2.5</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
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
            value={params.surface}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <MapIcon color="secondary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">m&sup2;</InputAdornment>
              ),
            }}
          >
            <MenuItem value={1.6}>1,6</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <InputLabel id="tiltLabel" className={classes.label}>
            {t('TILT')}
          </InputLabel>
          <Select
            id="tiltLabel"
            fullWidth
            variant="outlined"
            label={t('TILT')}
            notched={false}
            className={classes.select}
            onChange={handleChangeTilt}
          >
            <MenuItem value={15}>{t('FLAT')} 15º</MenuItem>
            <MenuItem value={30}>{t('INCLINED')} 30º</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <InputLabel id="orientationLabel" className={classes.label}>
            {t('ORIENTATION')}
          </InputLabel>
          <TextField
            id="orientationLabel"
            fullWidth
            variant="outlined"
            notched={false}
            className={classes.select}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <MapIcon color="secondary" />
                </InputAdornment>
              ),
            }}
            value={params.orientation}
          />
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
          disabled={!haveInstallParams}
        >
          {t('CALCULATE')}
        </Button>
      </div>
    </div>
  )
}

export default InstallationParams

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
