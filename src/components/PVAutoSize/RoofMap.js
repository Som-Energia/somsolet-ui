import React, { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

import Fab from '@material-ui/core/Fab'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'

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
  const [edit] = useState(true)

  const [surfaceDraw, setSurfaceDraw] = useState(false)
  const [surface, setSurface] = useState(0)
  const [deleteDraw, setDeleteDraw] = useState()
  const [zoomLevel, setZoomLevel] = useState(ZOOM_LEVEL)
  const [center, setCenter] = useState(coordinates)

  const handleDelete = () => {
    setSurfaceDraw(false)
    setSurface(0)
    setDeleteDraw(Math.random())
    callbackFn({ surface: undefined })
  }

  useEffect(() => {
    if (surfaceDraw) {
      callbackFn({ surface, center, zoomLevel })
    }
  }, [surface, surfaceDraw])

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
        setZoomLevel(map.getZoom())
        setCenter(map.getCenter())
      } else {
        if (e.type !== 'draw.delete')
          console.log(t('Use the draw tools to draw a polygon!'))
      }
    }

    function saveSurfaceData(e) {
      const data = draw.getAll()
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
  }, [coordinates, deleteDraw])

  return (
    <div className={classes.root}>
      <div className={classes.mapContainer} ref={mapContainer}></div>
      {surfaceDraw && (
        <div className={classes.controlParams}>
          <div className={classes.surfaceControls}>
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
          </div>
        </div>
      )}
      <div className={classes.controlFabs}>
        {surfaceDraw && (
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
          </>
        )}
      </div>
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
    bottom: '0px',

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
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      maxWidth: '100px',
      marginBottom: '8px',
    },
    '& .MuiOutlinedInput-adornedEnd': {
      '& .MuiTypography-colorTextSecondary': {
        color: 'rgba(0, 0, 0, 0.87)',
      },
      paddingRight: '8px',
      marginBottom: 0,
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
