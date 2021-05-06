import React, { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

import Fab from '@material-ui/core/Fab'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import * as turf from '@turf/turf'

import { mapStyles } from 'services/pvautosize/utils'

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
  const [orientation, setOrientation] = useState(0)

  const handleEdit = () => {
    setEdit(true)
  }

  const handleOrientation = (event) => {
    setOrientation(event.target.value)
  }

  const handleDelete = () => {
    console.log('delete')
    setSurfaceDraw(false)
    setEdit(false)
  }

  const handleSave = () => {
    console.log('save')
    setEdit(false)
    callbackFn({ surface, orientation })
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

      {edit && (
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
      )}
    </div>
  )
}

export default RoofMap

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
    display: 'flex',
    flexDirection: 'column',
    padding: '8px',
    '& .MuiFab-root': {
      marginBottom: '8px',
    },
  },
  controlParams: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,

    display: 'flex',
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
