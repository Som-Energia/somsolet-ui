import React, { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'

import { bearingToCardinal } from 'services/pvautosize/utils'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { useTranslation } from 'react-i18next'

mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
const ZOOM_LEVEL = 18

const OrientationMap = ({ updateParams, params }) => {
  const classes = useStyles()
  const mapContainer = useRef()
  const { t } = useTranslation()

  const {
    center: coordinates,
    zoomLevel,
    installationParams,
    hasTwoWaters,
  } = params

  const [azimuth, setAzimuth] = useState(null)
  const [cardinal, setCardinal] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [values, setValues] = useState([])

  const getOrientationValue = (value) => {
    setCardinal(bearingToCardinal(value))
    setRotation(value)
    setAzimuth(value)
    return value
  }

  useEffect(() => {
    if (hasTwoWaters && azimuth) {
      updateParams({
        azimuth: installationParams.azimuth.find(
          (a) => a[0] === azimuth && a.length === 2
        ),
      })
    }
  }, [hasTwoWaters])

  useEffect(() => {
    if (installationParams) {
      setValues([...new Set(installationParams.azimuth.map((a) => a[0]))])
    }
  }, [installationParams])

  useEffect(() => {
    if (azimuth || cardinal) {
      updateParams({ azimuth, orientation: `${azimuth}º ${cardinal}` })
    }
  }, [azimuth, cardinal])

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: coordinates,
      zoom: zoomLevel || ZOOM_LEVEL,
    })

    return () => {
      map.remove()
    }
  }, [coordinates])

  return (
    <div className={classes.root}>
      <div className={classes.mapContainer} ref={mapContainer}></div>
      <div className={classes.orientationLayer}>
        <div className={classes.orientationPanel}>
          <div className="cardinalRow">
            <div className="cardinal">N</div>
          </div>
          <div className="cardinalRow">
            <div className="cardinal">O</div>
            <svg
              fill="none"
              style={{ webkitTransform: `rotate(${rotation}deg)` }}
              stroke="#7da101"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="rgb(255, 255, 255, 0.7)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
              ></path>
            </svg>
            <div className="cardinal">E</div>
          </div>
          <div className="cardinalRow">
            <div className="cardinal">S</div>
          </div>
        </div>
        <div className={classes.orientationParams}>
          <Select
            id="azimuth"
            fullWidth
            required
            variant="outlined"
            name="azimuth"
            label={t('AZIMUTH')}
            notched={false}
            className={classes.select}
            onChange={(e) => getOrientationValue(e.target.value)}
          >
            {values
              ? values.map((i) => (
                  <MenuItem value={i} key={i}>
                    {`${i}º ${bearingToCardinal(i)}`}
                  </MenuItem>
                ))
              : null}
          </Select>
        </div>
      </div>
    </div>
  )
}

export default OrientationMap

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    minHeight: '350px',
    width: '100%',
    position: 'relative',
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    '& .mapboxgl-ctrl-logo': {
      display: 'none',
    },
  },
  orientationLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '4px',
    borderRadius: '4px',
  },
  orientationPanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem',
    '& .cardinalRow': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      fontSize: '1.5rem',
      fontWeight: '500',
    },
    '& svg': {
      width: '8rem',
      height: '8rem',
    },
  },
  orientationParams: {
    margin: '16px 8px',
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: 'rgba(256, 256, 256, 0.7)',
  },
  select: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: '2px solid #9abd20 !important',
    },
  },
}))
