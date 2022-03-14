import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loading from '../components/Loading'
import PDF from '../components/Report/PDF'
import { PDFDownloadLink } from '@react-pdf/renderer'

const Report = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  console.log({ data, isLoading, isError })

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
      <PDFDownloadLink document={<PDF data={data} />} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download now!'
        }
      </PDFDownloadLink>
    </>
  )
}

export default Report
