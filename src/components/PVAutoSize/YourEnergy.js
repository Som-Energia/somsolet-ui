import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const YourEnergy = (props) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const { scenario } = props

  const niceFloat = (attribute, maximumFractionDigits = 2) => {
    return new Intl.NumberFormat('ca', {
      maximumFractionDigits: maximumFractionDigits,
    }).format(scenario?.[attribute] || '0')
  }

  return (
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
    </Box>
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
