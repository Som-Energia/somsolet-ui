import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'

import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'

import { getPVScenario } from '../../services/pvautosize/api'

const YourEnergy = (props) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const { params, token, contract } = props

  const [loading, setLoading] = useState(false)
  const [scenario, setScenario] = useState()
  const [power, setPower] = useState(10.64)

  const niceFloat = (attribute, maximumFractionDigits = 2) => {
    return new Intl.NumberFormat('ca', {
      maximumFractionDigits: maximumFractionDigits,
    }).format(scenario?.[attribute] || '0')
  }

  const handleChangePower = (event) => {
    setPower(event.target.value)
  }

  const handleClick = () => {}

  useEffect(() => {
    const requestScenario = async () => {
      const installationParams = { ...params, power }
      setLoading(true)
      const data = await getPVScenario({
        token,
        contract,
        installationParams,
      })
      setScenario(data)
      setLoading(false)
    }
    requestScenario()
  }, [power])

  return (
    <>
      {loading ? (
        <>Loading...</>
      ) : (
        <Box mt={1} style={{ flex: 1 }}>
          <Box className={classes.row}>
            {t('YOUR_ENERGY_ANNUAL_USE')}
            <Box className={classes.reportValue}>
              <span>{niceFloat('loadKwhYear')}</span>
              &nbsp;kWh/{t('YEAR')}
            </Box>
          </Box>
          <Typography className={classes.reportTitle}>
            {t('ESTIMATED_ANNUAL_GENERATION')}
          </Typography>
          <Box className={classes.row}>
            {t('PRODUCED')}
            <Box className={classes.reportValue}>
              <span>{niceFloat('productionKwhYear')}</span>
              &nbsp;kWh/{t('YEAR')}
            </Box>
          </Box>
          <Box className={classes.row}>
            {t('INSTANT_AUTOGENERATION')}
            <Box className={classes.reportValue}>
              <span>{niceFloat('productionToLoadKwhYear')}</span>
              &nbsp;kWh/{t('YEAR')}
            </Box>
          </Box>
          <Box className={classes.row}>
            {t('SURPLUS')}
            <Box className={classes.reportValue}>
              <span>{niceFloat('productionToGridKwhYear')}</span>
              &nbsp;kWh/{t('YEAR')}
            </Box>
          </Box>

          <Typography className={classes.reportTitle}>
            {t('ESTIMATED_ANNUAL_SAVINGS_COSTS')}
          </Typography>
          <Box className={classes.row}>
            {t('SAVING')}
            <Box className={classes.reportValue}>
              <span>{niceFloat('savingsEuroYear')}</span>
              &nbsp;€/{t('YEAR')}
            </Box>
          </Box>
          <Box className={classes.row}>
            {t('INSTALLATION_COST')}
            <Box className={classes.reportValue}>
              <span>{niceFloat('installationCostEuro')}</span>
              &nbsp;€
            </Box>
          </Box>
          <Box className={classes.row}>
            {t('RETURN_WITH_COMP')}
            <Box className={classes.reportValue}>
              <span>{niceFloat('paybackYears', 1)}</span>
              &nbsp;{t('YEARS')}
            </Box>
          </Box>

          <Box>
            <Typography className={classes.reportTitle}>
              {t('POWER_PEAK')}
            </Typography>
            <Select
              id="powerLabel"
              fullWidth
              variant="outlined"
              label={t('POWER_PEAK')}
              notched={false}
              className={classes.select}
              onChange={handleChangePower}
              value={power}
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
          </Box>
          <Box style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>
            <Button
              fullWidth
              color="primary"
              size="large"
              disableElevation
              variant="contained"
              className={classes.button}
              startIcon={<DescriptionOutlinedIcon />}
              onClick={handleClick}
              disabled={!!scenario}
            >
              {t('SEE_REPORT')}
            </Button>
          </Box>
        </Box>
      )}
    </>
  )
}

export default YourEnergy

const useStyles = makeStyles((theme) => ({
  row: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px',
    color: theme.palette.secondary.main,
    fontSize: '1rem',
  },
  reportTitle: {
    textTransform: 'uppercase',
    marginTop: '16px',
    marginBottom: '8px',
  },
  reportValue: {
    color: theme.palette.text.primary,
    '& span': {
      fontWeight: 500,
      fontSize: '1.1rem',
    },
  },
}))
