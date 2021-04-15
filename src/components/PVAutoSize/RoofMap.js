import React, { useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

import Fab from '@material-ui/core/Fab'
import Button from '@material-ui/core/Button'

import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp'
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'
import MapboxDraw from '@mapbox/mapbox-gl-draw'

mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
const ZOOM_LEVEL = 18

const RoofMap = ({ coordinates }) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const mapContainer = useRef()
  const [edit, setEdit] = useState(false)

  const handleEdit = () => {
    setEdit(!edit)
  }

  console.log(coordinates)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      center: coordinates,
      zoom: ZOOM_LEVEL,
    })
    const draw = new MapboxDraw({
      /*
      displayControlsDefault: false,
      modes: Object.assign(MapboxDraw.modes, {
        draw_polygon: FreehandMode
      })
      */
    })
    map.addControl(draw)
    return () => map.remove()
  }, [coordinates])

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
            >
              <DeleteOutlineOutlinedIcon />
            </Fab>
            <Fab
              size="small"
              color="primary"
              aria-label="save"
              className={classes.margin}
              onClick={handleEdit}
            >
              <SaveOutlinedIcon />
            </Fab>
          </>
        )}
      </div>

      <div className={classes.controlParams}>
        <Button variant="contained" size="small" color="primary">
          {t('SURFACE')}
        </Button>
        <Button variant="contained" size="small" color="primary" disabled>
          {t('ORIENTATION')}
        </Button>
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
  },
}))
