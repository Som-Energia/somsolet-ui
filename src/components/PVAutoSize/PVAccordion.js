import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { makeStyles } from '@material-ui/core/styles'

import Container from '@material-ui/core/Container'
import Fab from '@material-ui/core/Fab'
import Zoom from '@material-ui/core/Zoom'
import { Box } from '@material-ui/core'
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined'
import NavigateNextIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import MapIcon from '@material-ui/icons/MapOutlined'
import FlashIcon from '@material-ui/icons/FlashOnOutlined'
import InputOutlinedIcon from '@material-ui/icons/InputOutlined'

import { getContractParams } from '../../services/pvautosize/api'
import RoofMap from 'components/PVAutoSize/RoofMap'
import OrientationMap from 'components/PVAutoSize/OrientationMap'
import Installation from 'components/PVAutoSize/Installation'
import YourEnergy from 'components/PVAutoSize/YourEnergy'
import Loading from 'components/Loading'
import { ReportContext } from 'contexts/ReportContext'

import AccordionPanel from './AccordionPanel'

const PVAccordion = ({ coordinates, token, contract, getReport }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const [expanded, setExpanded] = useState(1)
  const [params, setParams] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const [completed, setCompleted] = useState(false)
  const data = useContext(ReportContext)

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

  const handleClickTab = (value) => {
    setExpanded(value)
  }

  useEffect(() => {
    if (expanded === 1) {
      const isValid = params?.surface !== undefined
      setCompleted(isValid)
    }

    if (expanded === 2) {
      const isValid = params?.azimuth !== undefined
      setCompleted(isValid)
    }

    if (expanded === 3) {
      const isValid = params?.tilt !== '' && params?.hasTwoWatters !== ''
      setCompleted(isValid)
    }
  }, [expanded, params])

  useEffect(() => {
    if (!params.installationParams) {
      setIsLoading(true)
      getContractParams({ token, contract })
        .then((rsp) => {
          setParams({
            ...params,
            installationParams: { ...params.installationParams, ...rsp },
          })
          setIsLoading(false)
        })
        .catch((error) => {
          console.error(error)
          setError(error)
          setIsLoading(false)
        })
    }
  }, [])

  const updateParams = (newParams) => {
    setParams({ ...params, ...newParams })
  }

  console.log("CONTEXT", data)

  return isLoading ? (
    <Loading />
  ) : error ? (
    <p>Error</p>
  ) : (
    <>
      <Container maxWidth="sm" className={classes.root}>
        <AccordionPanel
          panelId="panel1"
          expandedPanel={`panel${expanded}`}
          onChange={handleChange}
          icon={<MapIcon color="primary" />}
          title={t('ROOF_SURFACE')}
          description={t('ROOF_DESCRIPTION')}
          disabled={false}
          onClickTab={handleClickTab}
        >
          <RoofMap coordinates={coordinates} updateParams={updateParams} />
        </AccordionPanel>

        <AccordionPanel
          panelId="panel2"
          expandedPanel={`panel${expanded}`}
          onChange={handleChange}
          icon={<ExploreOutlinedIcon color="primary" />}
          title={t('ROOF_ORIENTATION')}
          disabled={params?.surface === undefined}
          onClickTab={handleClickTab}
        >
          <OrientationMap updateParams={updateParams} params={params} />
        </AccordionPanel>

        <AccordionPanel
          panelId="panel3"
          expandedPanel={`panel${expanded}`}
          onChange={handleChange}
          icon={<InputOutlinedIcon color="primary" />}
          title={t('INSTALLATION_PARAMS')}
          disabled={params?.azimuth === undefined}
          onClickTab={handleClickTab}
        >
          <Box px={2} py={1}>
            <Installation
              params={params}
              token={token}
              contract={contract}
              updateParams={updateParams}
            />
          </Box>
        </AccordionPanel>

        <AccordionPanel
          panelId="panel4"
          expandedPanel={`panel${expanded}`}
          onChange={handleChange}
          icon={<FlashIcon color="primary" />}
          title={t('YOUR_ENERGY')}
          disabled={params?.tilt === '' && params?.hasTwoWatters === ''}
          onClickTab={handleClickTab}
        >
          <Box px={3} py={2} style={{ width: '100%' }}>
            <YourEnergy
              params={params}
              token={token}
              contract={contract}
              /* onCreateReport={getReport} */
            />
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
