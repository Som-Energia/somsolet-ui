import React, { useContext, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
/* import { PDF } from '../components/Report/PDF' */
import Button from '@material-ui/core/Button'
import { useTranslation } from 'react-i18next'
import { ReportContext } from 'contexts/ReportContext'

const Report = () => {
  console.log("HOLAAAAAA")
  const componentRef = useRef()
  const data = useContext(ReportContext)

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  console.log(data)
  const { t } = useTranslation()
  return (
    <div style={{ width: 1145, margin: '0 auto' }}>
      <div style={{ backgroundColor: 'white', padding: 15, marginBottom: 20 }}>
        <Button onClick={handlePrint} style={{ backgroundColor: '#b9db42' }}>
          {t('IMPRIMIR')}
        </Button>
      </div>
      {/* <PDF data={data} ref={componentRef} /> */}
    </div>
  )
}

export default Report
