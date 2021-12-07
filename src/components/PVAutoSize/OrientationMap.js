import React, { useEffect, useState, useRef } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

import TextField from '@material-ui/core/TextField'
import Slider from '@material-ui/core/Slider'

import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'
// import MapboxDraw from '@mapbox/mapbox-gl-draw'

import { bearingToCardinal } from 'services/pvautosize/utils'

mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
const ZOOM_LEVEL = 18

const OrientationMap = (props) => {
  const classes = useStyles()
  // const { t } = useTranslation()
  console.log(props)
  const { coordinates, zoomLevel, callbackFn } = props

  const mapContainer = useRef()

  const [orientation, setOrientation] = useState('0º N')
  const [rotation, setRotation] = useState(0)

  const getOrientationValue = (value) => {
    const cardinal = bearingToCardinal(value)
    setRotation(value)
    setOrientation(`${value}º ${cardinal}`)
    return value
  }

  useEffect(() => {
    callbackFn({ orientation: orientation })
  }, [orientation])

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
          <SomSlider
            defaultValue={0}
            getAriaValueText={getOrientationValue}
            aria-labelledby="orientation-slider"
            step={10}
            min={45}
            max={315}
          />
          <TextField
            variant="outlined"
            size="small"
            disabled
            className="orientationInputText"
            value={orientation}
          />
        </div>
      </div>
    </div>
  )
}

export default OrientationMap

const SomSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider)

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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    margin: '16px 8px',
    padding: '0 0 0 24px',
    backgroundColor: 'rgba(256, 256, 256, 0.7)',
    '& .MuiSlider-root': {
      root: { height: 8 },
    },
    '& .orientationInputText': {
      marginLeft: '16px',
      border: 0,
      '& .MuiInputBase-root': {
        backgroundColor: '#fff',
      },
    },
  },
}))
