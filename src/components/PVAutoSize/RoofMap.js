import React, { useEffect, useState, useRef } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

import Fab from '@material-ui/core/Fab'
import Button from '@material-ui/core/Button'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Slider from '@material-ui/core/Slider'
import Switch from '@material-ui/core/Switch'

import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import * as turf from '@turf/turf'

import { mapStyles, bearingToCardinal } from 'services/pvautosize/utils'

mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
const ZOOM_LEVEL = 18

const RoofMap = ({ coordinates, callbackFn }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const mapContainer = useRef()
  const [edit, setEdit] = useState(false)

  const [mode, setMode] = useState('surface')
  const [surfaceDraw, setSurfaceDraw] = useState(false)
  const [surface, setSurface] = useState(0)
  const [orientation, setOrientation] = useState('0º N')
  const [rotation, setRotation] = useState(0)
  const [twoWaters, setTwoWaters] = useState(false)

  const handleEdit = () => {
    setEdit(true)
  }

  const handleOrientation = (event) => {
    setOrientation(event.target.value)
  }

  const handleDelete = () => {
    setSurfaceDraw(false)
    setEdit(false)
  }

  const handleSave = () => {
    console.log('save')
    setEdit(false)
    callbackFn({ surface, orientation })
  }

  const getOrientationValue = (value, index) => {
    const cardinal = bearingToCardinal(value)
    setRotation(value)
    setOrientation(`${value}º ${cardinal}`)
    return value
  }

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: coordinates,
      zoom: ZOOM_LEVEL,
    })

    function updateSurface(e) {
      const data = draw.getAll()
      if (data.features.length > 0) {
        const area = turf.area(data)
        const roundedArea = Math.round(area)
        setSurface(roundedArea)
      } else {
        if (e.type !== 'draw.delete')
          console.log('Use the draw tools to draw a polygon!')
      }
    }

    function saveSurfaceData(e) {
      const data = draw.getAll()
      console.log('save surface data')
      console.log(data)
      if (data.features.length > 0) {
        setSurfaceDraw(data)
      }
    }

    const draw = new MapboxDraw({
      defaultMode: surfaceDraw ? 'simple_select' : 'draw_polygon',
      displayControlsDefault: false,
      controls: {
        point: false,
        line_string: false,
        combine_features: false,
        uncombine_features: false,
      },
      styles: mapStyles,
    })

    if (edit) {
      map.addControl(draw)
      if (surfaceDraw) {
        draw.set(surfaceDraw)
      }

      map.on('draw.render', updateSurface)
      map.on('draw.create', updateSurface)
      map.on('draw.delete', updateSurface)
      map.on('draw.update', updateSurface)
      map.on('draw.modechange', saveSurfaceData)
    } else if (surfaceDraw) {
      map.on('load', function () {
        map.addSource('pvautosize', {
          type: 'geojson',
          data: surfaceDraw,
        })

        map.addLayer({
          id: 'gl-draw-polygon-fill-active',
          type: 'fill',
          source: 'pvautosize',
          filter: ['==', '$type', 'Polygon'],
          paint: {
            'fill-color': '#b9db42',
            'fill-outline-color': '#b9db42',
            'fill-opacity': 0.3,
          },
        })

        map.addLayer({
          id: 'gl-draw-polygon-stroke-inactive',
          type: 'line',
          source: 'pvautosize',
          filter: ['==', '$type', 'Polygon'],
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
          },
          paint: {
            'line-color': '#b9db42',
            'line-width': 2,
          },
        })
      })
    }

    return () => {
      setSurface(0)
      map.remove()
    }
  }, [coordinates, edit])

  return (
    <div className={classes.root}>
      <div className={classes.mapContainer} ref={mapContainer}></div>
      {edit && (
        <>
          {mode === 'orientation' && (
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
                  min={0}
                  max={360}
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
          )}
          <div className={classes.controlParams}>
            <div className={classes.surfaceControls}>
              {mode === 'surface' && (
                <TextField
                  variant="outlined"
                  size="small"
                  disabled
                  value={surface}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">m&sup2;</InputAdornment>
                    ),
                  }}
                />
              )}
              <Button
                variant="outlined"
                size="small"
                className={
                  mode === 'surface'
                    ? classes.buttonMapActive
                    : classes.buttonMapInactive
                }
                onClick={() => setMode('surface')}
              >
                {t('SURFACE')}
              </Button>
            </div>
            {mode === 'orientation' && (
              <div className={classes.twoWaters}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={twoWaters}
                        onChange={() => setTwoWaters(!twoWaters)}
                        name="twoWaters"
                        color="primary"
                      />
                    }
                    label={t('TWO_WATERS')}
                  />
                </FormGroup>
              </div>
            )}
            <div className={classes.orientationControls}>
              {mode === 'orientation' && <Button onClick={handleOrientation} />}
              <Button
                variant="outlined"
                size="small"
                className={
                  mode === 'orientation'
                    ? classes.buttonMapActive
                    : classes.buttonMapInactive
                }
                onClick={() => setMode('orientation')}
              >
                {t('ORIENTATION')}
              </Button>
            </div>
          </div>
        </>
      )}
      <div className={classes.controlFabs}>
        {!edit && (
          <Fab
            size="small"
            color="primary"
            aria-label="edit"
            onClick={handleEdit}
            className={classes.margin}
          >
            <EditOutlinedIcon />
          </Fab>
        )}
        {edit && (
          <>
            <Fab
              size="small"
              color="primary"
              aria-label="delete"
              className={classes.margin}
              onClick={handleDelete}
            >
              <DeleteOutlineOutlinedIcon />
            </Fab>
            <Fab
              size="small"
              color="primary"
              aria-label="save"
              className={classes.margin}
              onClick={handleSave}
            >
              <SaveOutlinedIcon />
            </Fab>
          </>
        )}
      </div>
    </div>
  )
}

export default RoofMap

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
  mapControls: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  controlFabs: {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
    '& .MuiFab-root': {
      marginBottom: '8px',
    },
  },
  orientationLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '46px',
    borderRadius: '4px',
  },
  twoWaters: {
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: '16px',
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
      fontSize: '1.25rem',
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
  controlParams: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '8px',

    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: '8px 8px',
    '& .MuiOutlinedInput-root': {
      '& input': {
        color: 'rgba(0, 0, 0, 0.87)',
        textAlign: 'right',
        marginRight: '8px',
        paddingTop: '8px',
        paddingBottom: '8px',
      },
      backgroundColor: '#fff',
      maxWidth: '100px',
      marginBottom: '8px',
    },
    '& .MuiOutlinedInput-adornedEnd': {
      '& .MuiTypography-colorTextSecondary': {
        color: 'rgba(0, 0, 0, 0.87)',
      },
      paddingRight: '8px',
    },
  },
  surfaceControls: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  orientationControls: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  buttonMapActive: {
    color: '#cccccc',
    border: '1px solid #cccccc',
  },
  buttonMapInactive: {
    color: '#b9db42',
    border: '1px solid #b9db42',
  },
}))
