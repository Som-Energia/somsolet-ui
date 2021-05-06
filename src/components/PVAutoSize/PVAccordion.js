import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MapIcon from '@material-ui/icons/MapOutlined'
import FlashIcon from '@material-ui/icons/FlashOnOutlined'
import InputOutlinedIcon from '@material-ui/icons/InputOutlined'

import RoofMap from 'components/PVAutoSize/RoofMap'
import InstallationParams from 'components/PVAutoSize/InstallationParams'
import YourEnergy from 'components/PVAutoSize/YourEnergy'

const PVAccordion = (props) => {
  const { coordinates } = props
  const classes = useStyles()
  const { t } = useTranslation()

  const [expanded, setExpanded] = useState('panel1')
  const [params, setParams] = useState({})

  const handleChange = (panel) => (isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const updateParams = (newParams) => {
    setParams({ ...params, ...newParams })
  }

  const handleClick = () => {}

  return (
    <>
      <Container maxWidth="sm" className={classes.root}>
        <Accordion
          square
          elevation={0}
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={classes.expandIconColor} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              <MapIcon color="primary" />
              {t('ROOF_SURFACE')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.detailsNoPadding}>
            <RoofMap coordinates={coordinates} callbackFn={updateParams} />
          </AccordionDetails>
        </Accordion>

        <Accordion
          square
          elevation={0}
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={classes.expandIconColor} />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>
              <InputOutlinedIcon color="primary" />
              {t('INSTALLATION_PARAMS')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <InstallationParams params={params} />
          </AccordionDetails>
        </Accordion>

        <Accordion
          square
          elevation={0}
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className={classes.expandIconColor} />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>
              <FlashIcon color="primary" />
              {t('YOUR_ENERGY')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <YourEnergy />
          </AccordionDetails>
        </Accordion>
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
            {t('SEE_REPORT')}
          </Button>
        </div>
      </Container>
    </>
  )
}

export default PVAccordion

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
  },
  details: {
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
  },
  detailsNoPadding: {
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    padding: 0,
  },
  expandIconColor: {
    color: theme.palette.primary.main,
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.typography.pxToRem(16),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
    fontWeight: theme.typography.fontWeightRegular,
    textTransform: 'uppercase',
    '& .MuiSvgIcon-root': {
      marginRight: '16px',
    },
  },
  select: {
    backgroundColor: '#fff',
    '& .MuiOutlinedInput-notchedOutline': {
      border: '3px solid #9abd20 !important',
    },
  },
  buttonContainer: {
    padding: '2rem 1rem',
  },
  button: {
    '& .MuiButton-label': {
      textTransform: 'none',
      justifyContent: 'space-between',
      fontSize: '1rem',
    },
  },
  reportTitle: {
    textTransform: 'uppercase',
  },
  reportLabel: {
    color: '#cfcfcf',
  },
}))
