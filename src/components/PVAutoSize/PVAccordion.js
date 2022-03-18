import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import Zoom from '@material-ui/core/Zoom'

import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined'
import NavigateNextIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import MapIcon from '@material-ui/icons/MapOutlined'
import FlashIcon from '@material-ui/icons/FlashOnOutlined'
import InputOutlinedIcon from '@material-ui/icons/InputOutlined'

import RoofMap from 'components/PVAutoSize/RoofMap'
import OrientationMap from 'components/PVAutoSize/OrientationMap'
import InstallationParams from 'components/PVAutoSize/InstallationParams'
import YourEnergy from 'components/PVAutoSize/YourEnergy'

import AccordionPanel from './AccordionPanel'
import { Box } from '@material-ui/core'

const PVAccordion = (props) => {
  const { coordinates, token, contract } = props
  const classes = useStyles()
  const { t } = useTranslation()

  const [expanded, setExpanded] = useState(1)
  const [params, setParams] = useState({})
  const [completed, setCompleted] = useState(false)

  const handleChange = (panel) => {
    // const isExpanded = panel === expanded
    // setExpanded(isExpanded ? false : panel)
  }

  const handleNext = () => {
    setExpanded(expanded + 1)
  }

  const handleBack = () => {
    setExpanded(expanded - 1)
  }

  useEffect(() => {
    console.log(params)
    if (expanded === 1) {
      const isValid = params?.surface !== undefined
      setCompleted(isValid)
    }

    if (expanded === 2) {
      const isValid = params?.orientation !== undefined
      setCompleted(isValid)
    }

    if (expanded === 3) {
      console.log('is valid?')
      console.log(params)
      const isValid = params?.tilt !== '' && params?.twoWaters !== ''
      setCompleted(isValid)
    }
  }, [expanded, params])

  const updateParams = (newParams) => {
    console.log({ params })
    setParams({ ...params, ...newParams })
  }

  return (
    <>
      <Container maxWidth="sm" className={classes.root}>
        <AccordionPanel
          panelId="panel1"
          expandedPanel={`panel${expanded}`}
          onChange={handleChange}
          icon={<MapIcon color="primary" />}
          title={t('ROOF_SURFACE')}
        >
          <RoofMap coordinates={coordinates} callbackFn={updateParams} />
        </AccordionPanel>

        <AccordionPanel
          panelId="panel2"
          expandedPanel={`panel${expanded}`}
          onChange={handleChange}
          icon={<ExploreOutlinedIcon color="primary" />}
          title={t('ROOF_ORIENTATION')}
        >
          <OrientationMap
            coordinates={params?.center || coordinates}
            zoomLevel={params?.zoomLevel}
            callbackFn={updateParams}
          />
        </AccordionPanel>

        <AccordionPanel
          panelId="panel3"
          expandedPanel={`panel${expanded}`}
          onChange={handleChange}
          icon={<InputOutlinedIcon color="primary" />}
          title={t('INSTALLATION_PARAMS')}
        >
          <Box px={2} py={1}>
            <InstallationParams
              params={params}
              token={token}
              contract={contract}
              setParams={updateParams}
            />
          </Box>
        </AccordionPanel>

        <AccordionPanel
          panelId="panel4"
          expandedPanel={`panel${expanded}`}
          onChange={handleChange}
          icon={<FlashIcon color="primary" />}
          title={t('YOUR_ENERGY')}
        >
          <Box px={3} py={2} style={{ width: '100%' }}>
            <YourEnergy params={params} token={token} contract={contract} />
          </Box>
        </AccordionPanel>
      </Container>

      <Zoom in={expanded > 1} unmountOnExit>
        <Fab
          aria-label="previous"
          className={classes.fabBack}
          color="primary"
          onClick={handleBack}
        >
          <ArrowBackIosIcon />
        </Fab>
      </Zoom>

      <Zoom in={expanded < 4} unmountOnExit>
        <Fab
          aria-label="next"
          className={classes.fab}
          color="primary"
          onClick={handleNext}
          disabled={!completed}
        >
          <NavigateNextIcon />
        </Fab>
      </Zoom>
    </>
  )
}

export default PVAccordion

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    position: 'relative',
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
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    backgroundColor: '#fff',
    color: '#9abd20',
  },
  fabBack: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    backgroundColor: '#fff',
    color: '#9abd20',
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.typography.pxToRem(16),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
    fontWeight: 300,
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
