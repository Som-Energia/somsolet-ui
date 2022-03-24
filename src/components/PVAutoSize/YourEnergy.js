import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'

import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'

import { getReport } from '../../services/pvautosize/api'
import InputLabel from '@material-ui/core/InputLabel'
import Loading from 'components/Loading'

const YourEnergy = ({ params, token, contract }) => {
  const classes = useStyles()

  const { t } = useTranslation()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [scenario, setScenario] = useState()
  const [power, setPower] = useState()
  const [peakPowerKw, setPeakPowerKw] = useState()

  const { tilt, azimuth } = params

  const niceFloat = (attribute, maximumFractionDigits = 2) => {
    return new Intl.NumberFormat('ca', {
      maximumFractionDigits: maximumFractionDigits,
    }).format(scenario?.[attribute] || '0')
  }

  const handleClick = () => {}

  useEffect(() => {
    if (contract && tilt && azimuth && token) {
      setIsLoading(true)
      getReport({ token, contract, tilt, power, azimuth })
        .then((rsp) => {
          setScenario(rsp)
          !power && setPeakPowerKw(rsp.peakPowerKw)
          setIsLoading(false)
        })
        .catch((error) => {
          setError(error)
          setIsLoading(false)
        })
    }
  }, [power, contract, tilt, azimuth, token])

  if (error) console.error(error)

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : params?.installationParams?.power ? (
        <div className={classes.container}>
          <Typography className={classes.reportTitle}>
            {t('POWER_PEAK')}
          </Typography>

          <InputLabel id="potenciaLabel" className={classes.label}>
            {t('POTENCIA')}
          </InputLabel>
          <Select
            id="potenciaLabel"
            fullWidth
            variant="outlined"
            name="potencia"
            label={t('POTENCIA')}
            notched={false}
            defaultValue={peakPowerKw}
            value={power}
            className={classes.select}
            onChange={(e) => setPower(e.target.value)}
          >
            {params.installationParams.power.map((p) => (
              <MenuItem value={p} key={p}>
                {p === peakPowerKw ? `${p} (${t('POTENCIA_OPTIMA')})` : p}
              </MenuItem>
            ))}
          </Select>
          <Typography className={classes.reportTitle}>
            {t('ESTIMATED_ANNUAL_GENERATION')}
          </Typography>
          <p>{t('YOUR_ENERGY_ANNUAL_USE')}</p>
          <div className={classes.reportValue}>
            <span>{niceFloat('loadKwhYear')}</span>
            &nbsp;kWh/{t('YEAR')}
          </div>
          <p>{t('PRODUCED')}</p>
          <div className={classes.reportValue}>
            <span>{niceFloat('productionKwhYear')}</span>
            &nbsp;kWh/{t('YEAR')}
          </div>
          <p>{t('INSTANT_AUTOGENERATION')}</p>
          <div className={classes.reportValue}>
            <span>{niceFloat('productionToLoadKwhYear')}</span>
            &nbsp;kWh/{t('YEAR')}
          </div>
          <p>{t('SURPLUS')}</p>
          <div className={classes.reportValue}>
            <span>{niceFloat('productionToGridKwhYear')}</span>
            &nbsp;kWh/{t('YEAR')}
          </div>
          <Typography className={classes.reportTitle}>
            {t('ESTIMATED_ANNUAL_SAVINGS_COSTS')}
          </Typography>
          <p>{t('SAVING')}</p>
          <div className={classes.reportValue}>
            <span>{niceFloat('savingsEuroYear')}</span>
            &nbsp;€/{t('YEAR')}
          </div>
          <p>{t('INSTALLATION_COST')}</p>
          <div className={classes.reportValue}>
            <span>{niceFloat('installationCostEuro')}</span>
            &nbsp;€
          </div>
          <p>{t('RETURN_WITH_COMP')}</p>
          <div className={classes.reportValue}>
            <span>{niceFloat('paybackYears', 1)}</span>
            &nbsp;{t('YEARS')}
          </div>
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
        </div>
      ) : null}
    </>
  )
}

export default YourEnergy

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
  },
  row: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px',
    color: theme.palette.secondary.main,
    fontSize: '1rem',
  },
  select: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: '2px solid #9abd20 !important',
    },
  },
  button: {
    gridColumn: '1/3',
  },
  label: {
    fontSize: '0.9rem',
    marginBottom: '8px',
  },
  reportTitle: {
    gridColumn: '1/3',
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
