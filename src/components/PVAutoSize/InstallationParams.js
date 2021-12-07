import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

import MapIcon from '@material-ui/icons/MapOutlined'

// import { getPVScenario } from '../../services/pvautosize/api'

const InstallationParams = (props) => {
  const { params, setParams } = props
  const classes = useStyles()
  const { t } = useTranslation()

  const [tilt, setTilt] = useState('')
  const [twoWaters, setTwoWaters] = useState('')

  const handleChangeTilt = (value) => {
    setTilt(value.target.value)
  }

  const handleChangeTwoWaters = (value) => {
    setTwoWaters(value.target.value)
  }

  /*
  const handleClick = async () => {
    const installationParams = { ...params, tilt, twoWaters }
    const scenario = await getPVScenario({
      token,
      contract,
      installationParams,
    })
    setParams({ scenario })
  }
  */

  useEffect(() => {
    const installationParams = { ...params, tilt, twoWaters }
    setParams({ ...installationParams })
    console.log(installationParams)
  }, [tilt, twoWaters])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <InputLabel id="surfaceLabel" className={classes.label}>
            {t('SURFACE')}
          </InputLabel>
          <TextField
            id="surfaceLabel"
            fullWidth
            disabled
            variant="outlined"
            className={{ ...classes.textfield, ...classes.textfieldDisabled }}
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
          <InputLabel id="orientationLabel" className={classes.label}>
            {t('ORIENTATION')}
          </InputLabel>
          <TextField
            id="orientationLabel"
            fullWidth
            disabled
            variant="outlined"
            notched={false}
            className={{ ...classes.textfield, ...classes.textfieldDisabled }}
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
          <InputLabel id="twoWatersLabel" className={classes.label}>
            {t('TWO_WATERS')}
          </InputLabel>
          <Select
            id="twoWatersLabel"
            fullWidth
            variant="outlined"
            label={t('TWO_WATERS')}
            notched={false}
            className={classes.select}
            onChange={handleChangeTwoWaters}
          >
            <MenuItem value={true}>{t('YES')}</MenuItem>
            <MenuItem value={false}>{t('NO')}</MenuItem>
          </Select>
        </Grid>
      </Grid>
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
  twoWatersContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  twoWaters: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '16px',
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
  textfieldDisabled: {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
}))
