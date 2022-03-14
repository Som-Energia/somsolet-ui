import React, { useEffect, useState, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

import axios from 'axios'
import Loading from '../components/Loading'
import { PDF } from '../components/Report/PDF'

const Report = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
      try {
        const result = await axios(
          `https://run.mocky.io/v3/0dc09e7a-da78-484f-99e3-63137f0400ad`
        )

        setData(result.data)
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <p>Error</p>
  ) : (
    <>
      <button onClick={handlePrint}>Print this out!</button>
      <PDF data={data} ref={componentRef} />
    </>
  )
}

export default Report
