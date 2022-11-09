import React, { useContext, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { PDF } from '../components/Report/PDF'
import Button from '@material-ui/core/Button'
import { useTranslation } from 'react-i18next'
import {ReportContext} from 'contexts/ReportContext'

const Report = () => {
  const componentRef = useRef()
  const {report,loadData} = useContext(ReportContext)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const { t } = useTranslation()
  return (
    <div style={{ width: 1145, margin: '0 auto' }}>
      <div style={{ backgroundColor: 'white', padding: 15, marginBottom: 20 }}>
        <Button onClick={handlePrint} style={{ backgroundColor: '#b9db42' }}>
          {t('IMPRIMIR')}
        </Button>
      </div>
      {loadData ? <PDF data={report} ref={componentRef} /> : null }
    </div>
  )
}

export default Report
