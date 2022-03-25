import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { PDF } from '../components/Report/PDF'

const Report = ({ data }) => {
  const componentRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (
    <>
      <button onClick={handlePrint}>Print this out!</button>
      <PDF data={data} ref={componentRef} />
    </>
  )
}

export default Report
