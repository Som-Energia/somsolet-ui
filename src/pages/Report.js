import React, { useEffect, useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import Loading from '../components/Loading'
import { PDF } from '../components/Report/PDF'
import { getReport } from '../services/somsolet/api'

const Report = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  useEffect(() => {
    setIsLoading(true)
    getReport()
      .then((report) => {
        setData(report)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setError(error)
        setIsLoading(false)
      })
  }, [])

  return isLoading ? (
    <Loading />
  ) : error ? (
    <p>Error</p>
  ) : (
    <>
      <button onClick={handlePrint}>Print this out!</button>
      <PDF data={data} ref={componentRef} />
    </>
  )
}

export default Report
