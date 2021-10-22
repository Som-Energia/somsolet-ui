import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'react-i18next'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Container from '@material-ui/core/Container'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'

import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import PlaceIcon from '@material-ui/icons/Place'

import pvautosize from 'images/pvautosize.svg'

import { geocodeAddress } from 'services/pvautosize/api'

const AddressSelector = ({ contracts = [], callbackFn }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [contract, setContract] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const contract = contracts.find((item) => item.name === event.target.value)
    setContract(contract)
  }

  const handleClick = async (event) => {
    setLoading(true)
    const data = await geocodeAddress(contract?.address)
    const geocodedAddress = data?.features?.[0]
    setLoading(false)
    callbackFn && callbackFn({ ...contract, address: geocodedAddress })
  }

  return (
    <>
      <Container maxWidth="sm">
        <div className={classes.imageWrapper}>
          <img src={pvautosize} />
        </div>
        <Typography component="h3" className={classes.claim}>
          {t('PV_AUTOSIZE_CLAIM')}
        </Typography>
        <FormControl
          fullWidth
          variant="outlined"
          className={classes.formControl}
        >
          {!contract?.address && (
            <InputLabel className={classes.label} id="addressLabel">
              <PlaceIcon color="secondary" /> {t('SELECT_ADDRESS')}
            </InputLabel>
          )}
          <Select
            id="addressLabel"
            label={t('ADRESS')}
            notched={false}
            className={classes.select}
            value={contract?.address}
            onChange={handleChange}
            startAdornment={
              contract?.address && (
                <InputAdornment position="start">
                  <PlaceIcon color="secondary" />
                </InputAdornment>
              )
            }
          >
            {contracts.map((contract, index) => (
              <MenuItem value={contract.name} key={index}>
                {contract.address}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          fullWidth
          color="primary"
          size="large"
          disableElevation
          variant="contained"
          className={classes.button}
          endIcon={
            loading ? (
              <CircularProgress color="secondary" size={30} />
            ) : (
              <NavigateNextIcon />
            )
          }
          onClick={handleClick}
          disabled={contract?.address === '' || loading}
        >
          {t('CONTINUE')}
        </Button>
      </Container>
    </>
  )
}

export default AddressSelector

const useStyles = makeStyles((theme) => ({
  imageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  claim: {
    fontSize: '1.25rem',
    lineHeight: '1.6rem',
    color: '#6c8026',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '1.25rem',
  },
  label: {
    display: 'flex',
    alignContent: 'center',
    '& svg': {
      marginTop: '-4px',
      marginRight: '8px',
    },
  },
  select: {
    backgroundColor: '#fff',
    '& .MuiOutlinedInput-notchedOutline': {
      border: '2px solid #9abd20 !important',
    },
  },
  button: {
    marginTop: '2rem',
    '& .MuiButton-label': {
      textTransform: 'none',
      justifyContent: 'space-between',
      fontSize: '1rem',
    },
  },
}))
