import React, { useEffect, useState } from 'react'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import { theme } from 'themes/pvautosize'
import { useTranslation } from 'react-i18next'

import CssBaseline from '@material-ui/core/CssBaseline'
import AddressSelector from 'components/PVAutoSize/AddressSelector'
import PVAccordion from 'components/PVAutoSize/PVAccordion'

const PVAutoSize = (props) => {
  const classes = useStyles()
  const { i18n } = useTranslation()
  const { contracts, token } = props

  const [contract, setContract] = useState()

  const contractsList =
    typeof contracts === 'string' && contracts !== ''
      ? JSON.parse(contracts)
      : []

  useEffect(() => {
    const language = props?.match?.params?.language
    language && i18n.changeLanguage(language)
  }, [props?.match?.params?.language, i18n])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        {contract?.address === undefined ? (
          <AddressSelector contracts={contractsList} callbackFn={setContract} />
        ) : (
          <PVAccordion
            coordinates={contract?.address?.center}
            contract={contract?.name}
            token={token}
          />
        )}
      </div>
    </ThemeProvider>
  )
}

export default PVAutoSize

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    paddingTop: '3rem',
    paddingBottom: '3rem',
    backgroundColor: '#b9db42',
  },
}))
